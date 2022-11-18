import { NestFactory } from "@nestjs/core";
import { UserService } from "../national-api/user/user.service";
import { UserModule } from "../national-api/user/user.module";
import { Role } from "../shared/casl/role.enum";
import { UserDto } from "../shared/dto/user.dto";
import { LedgerDbModule } from "../shared/ledger-db/ledger-db.module";
import { LedgerDbService } from "../shared/ledger-db/ledger-db.service";
import { getLogger } from "../shared/server";

exports.handler = async (event) => {
    console.log(`Setup Handler Started with: ${event.body}`)

    const userApp = await NestFactory.createApplicationContext(UserModule, {
      logger: getLogger(UserModule),
    });
    const userService = userApp.get(UserService);
    const u = await userService.findOne(process.env.ROOT_EMAIL);
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
      await ledgerModule.createIndex('serialNo');
    } catch(e) {
      console.log('QLDB table does not create') 
    }
    
    try {
      const user = new UserDto()
      user.email = process.env.ROOT_EMAIL
      user.name = "Root"
      user.role = Role.Root;
      user.city = "-"
      user.contactNo = "-"
      user.country = " "
      user.state = "-"
      user.zipCode = "-"
      await userService.create(user)
    } catch (e) {
      console.log(`User ${process.env.ROOT_EMAIL} does not create`, e) 
    }
  
}