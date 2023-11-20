import { NestFactory } from "@nestjs/core";
import { Handler } from "aws-lambda";
import { ConfigService } from "@nestjs/config";
import { UserModule, getLogger, UserService, CompanyRole, Role, CompanyModule, CompanyService, ProgrammeModule, ProgrammeService, LedgerDbModule, LedgerDBInterface, CreditOverall, TxType, OrganisationDto, UserDto, UtilModule, CountryService, Country, LocationModule, LocationInterface } from "@undp/carbon-services-lib";
const fs = require("fs");

export const handler: Handler = async (event) => {
  console.log(`Setup Handler Started with: ${event}`);

  if (!event) {
    event = process.env;
  }

  const userApp = await NestFactory.createApplicationContext(UserModule, {
    logger: getLogger(UserModule),
  });
  const userService = userApp.get(UserService);

  if (event.type === "IMPORT_USERS" && event.body) {
    const users = event.body.split("\n");

    let c = 0;
    for (const user of users) {
      c++;
      if (c === 1) {
        continue;
      }
      let fields = user.split(",");
      if (fields.length < 7) {
        continue;
      }
      fields = fields.map((f) => f.trim());
      // (name: string, companyRole: CompanyRole, taxId: string, password: string, email: string, userRole: string
      const cr =
        fields[4] == "Government"
          ? CompanyRole.GOVERNMENT
          : fields[4] == "Certifier"
          ? CompanyRole.CERTIFIER
          : fields[4] == "API"
          ? CompanyRole.API
          : fields[4] === "Ministry"
          ? CompanyRole.MINISTRY
          : CompanyRole.PROGRAMME_DEVELOPER;
      const ur =
        fields[5] == "admin"
          ? Role.Admin
          : fields[5] == "Manager"
          ? Role.Manager
          : Role.ViewOnly;
      console.log(
        "Inserting user",
        fields[0],
        cr,
        fields[3],
        fields[1],
        ur,
        fields[2]
      );
      const txId = fields[4] !== "Ministry" ? fields[3] : "";
      try {
        await userService.createUserWithPassword(
          fields[0],
          cr,
          txId,
          fields[6],
          fields[1],
          ur,
          fields[2],
          cr === CompanyRole.API && fields.length > 7 ? fields[7] : undefined
        );
      } catch (e) {
        console.log("Fail to create user", fields[1], e);
      }
    }
    return;
  }

  if (event.type === "IMPORT_ORG" && event.body) {
    const companyApp = await NestFactory.createApplicationContext(
      CompanyModule,
      {
        logger: getLogger(CompanyModule),
      }
    );
    const companyService = companyApp.get(CompanyService);
    const configService = companyApp.get(ConfigService);

    const companies = event.body.split("\n");

    let c = 0;
    for (const company of companies) {
      c++;
      if (c === 1) {
        continue;
      }
      let fields = company.split(",");
      if (fields.length < 5) {
        continue;
      }
      fields = fields.map((f) => f.trim());
      // (name: string, companyRole: CompanyRole, taxId: string, password: string, email: string, userRole: string
      const cr =
        fields[4] == "Certifier"
          ? CompanyRole.CERTIFIER
          : fields[4] == "API"
          ? CompanyRole.API
          : fields[4] === "Ministry"
          ? CompanyRole.MINISTRY
          : CompanyRole.PROGRAMME_DEVELOPER;

      const secScope =
        fields[4] === "Ministry" && fields[6]
          ? fields[6].split("-")
          : undefined;

      try {
        const org = await companyService.create({
          taxId: fields[4] !== "Ministry" ? fields[3] : undefined,
          companyId: undefined,
          paymentId: undefined,
          name: fields[0],
          email: fields[1],
          phoneNo: fields[2],
          website: undefined,
          address: configService.get("systemCountryName"),
          logo: undefined,
          country: configService.get("systemCountry"),
          companyRole: cr,
          createdTime: undefined,
          nameOfMinister: fields[5] || undefined,
          sectoralScope: secScope,
          regions: [],
          state: undefined //double check this
        });
        console.log("Company created", org);
      } catch (e) {
        console.log("Fail to create company", fields[1]);
      }
    }
    return;
  }

  if (event.type === "UPDATE_COORDINATES") {
    const prApp = await NestFactory.createApplicationContext(ProgrammeModule, {
      logger: getLogger(ProgrammeModule),
    });
    const programmeService = prApp.get(ProgrammeService);
    await programmeService.regenerateRegionCoordinates();
    return;
  }

  const u = await userService.findOne(event["rootEmail"]);
  if (u != undefined) {
    console.log("Root user already created and setup is completed");
  }

  const app = await NestFactory.createApplicationContext(LedgerDbModule, {
    logger: getLogger(LedgerDbModule),
  });
  try {
    const ledgerModule = app.get(LedgerDBInterface);

    await ledgerModule.createTable("company");
    await ledgerModule.createIndex("txId", "company");

    await ledgerModule.createTable("overall");
    await ledgerModule.createIndex("txId", "overall");
    const creditOverall = new CreditOverall();
    creditOverall.credit = 0;
    creditOverall.txId = event["systemCountryCode"];
    creditOverall.txRef = "genesis block";
    creditOverall.txType = TxType.ISSUE;
    await ledgerModule.insertRecord(creditOverall, "overall");
    await ledgerModule.createTable();
    await ledgerModule.createIndex("programmeId");
    console.log("QLDB Table created");
  } catch (e) {
    console.log("QLDB table does not create", e);
  }

  try {
    const company = new OrganisationDto();
    company.country = event["systemCountryCode"];
    company.name = event["name"];
    company.logo = event["logoBase64"];
    company.companyRole = CompanyRole.GOVERNMENT;
    company.taxId = `00000${event["systemCountryCode"]}`

    const user = new UserDto();
    user.email = event["rootEmail"];
    user.name = "Root";
    user.role = Role.Root;
    user.phoneNo = "-";
    user.company = company;

    console.log("Adding company", company);
    console.log("Adding user", user);

    await userService.create(user, -1, CompanyRole.GOVERNMENT);
  } catch (e) {
    console.log(`User ${event["rootEmail"]} failed to create`, e);
  }

  const countryData = fs.readFileSync("countries.json", "utf8");
  const jsonCountryData = JSON.parse(countryData);
  const utils = await NestFactory.createApplicationContext(UtilModule);
  const countryService = utils.get(CountryService);

  jsonCountryData.forEach(async (countryItem) => {
    if (countryItem["UN Member States"] === "x") {
      const country = new Country();
      country.alpha2 = countryItem["ISO-alpha2 Code"];
      country.alpha3 = countryItem["ISO-alpha3 Code"];
      country.name = countryItem["English short"];
      await countryService.insertCountry(country);
    }
  });

  const locationApp = await NestFactory.createApplicationContext(
    LocationModule,
    {
      logger: getLogger(UserModule),
    }
  );
  const locationInterface = locationApp.get(LocationInterface);
  const regionRawData = fs.readFileSync('regions.csv', 'utf8');
  await locationInterface.init(regionRawData);
};
