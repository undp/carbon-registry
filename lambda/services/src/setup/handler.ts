import { NestFactory } from "@nestjs/core";
import { UserService } from "../national-api/user/user.service";
import { UserModule } from "../national-api/user/user.module";
import { Role } from "../shared/casl/role.enum";
import { UserDto } from "../shared/dto/user.dto";
import { LedgerDbModule } from "../shared/ledger-db/ledger-db.module";
import { LedgerDbService } from "../shared/ledger-db/ledger-db.service";
import { getLogger } from "../shared/server";
import { UtilModule } from "../shared/util/util.module";
import { Country } from "../shared/entities/country.entity";
import { CountryService } from "../shared/util/country.service";
const fs = require('fs')

exports.handler = async (event) => {
    console.log(`Setup Handler Started with: ${event.body}`)

    const userApp = await NestFactory.createApplicationContext(UserModule, {
      logger: getLogger(UserModule),
    });
    const userService = userApp.get(UserService);
    const u = await userService.findOne(event['rootEmail']);
    if (u != undefined) {
      console.log('Root user already created and setup is completed')
      return;
    }

    const app = await NestFactory.createApplicationContext(LedgerDbModule, {
      logger: getLogger(LedgerDbModule),
    });
    try {
      const ledgerModule = app.get(LedgerDbService)
      await ledgerModule.createTable();
      await ledgerModule.createIndex('projectId');
    } catch(e) {
      console.log('QLDB table does not create') 
    }
    
    try {
      const user = new UserDto()
      user.email = event['rootEmail']
      user.name = "Root"
      user.role = Role.Root;
      user.city = "-"
      user.contactNo = "-"
      user.country = " "
      user.state = "-"
      user.zipCode = "-"
      await userService.create(user)
    } catch (e) {
      console.log(`User ${event['rootEmail']} does not create`, e) 
    }

    console.log('Creating countries')
    const data = fs.readFileSync('countries.json', 'utf8')
    const jsonData = JSON.parse(data)

    const utils = await NestFactory.createApplicationContext(UtilModule)
    const countryService = utils.get(CountryService)
    for (const jsn of jsonData) {
      if (jsn['ISO-alpha2 Code'] == undefined || jsn['ISO-alpha2 Code'] == "") {
        continue;
      }
      const country = new Country()
      country.alpha2 = jsn['ISO-alpha2 Code']
      country.alpha3 = jsn['ISO-alpha3 Code']
      country.name = jsn['Country or Area']
      await countryService.insertCountry(country)
      console.log('Country inserted', country)
    }
}