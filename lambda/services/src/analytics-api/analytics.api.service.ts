import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { DataCountResponseDto } from "../shared/dto/data.count.response";
import { QueryDto } from "../shared/dto/query.dto";
import { Programme } from "../shared/entities/programme.entity";
import { Repository } from "typeorm";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class AnalyticsAPIService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Programme) private programmeRepo: Repository<Programme>
  ) {}

  async programmesStaticDetails(
    user: User,
    abilityCondition: string
  ): Promise<DataCountResponseDto> {
    let resp;
    if (user?.companyRole === "Government") {
      resp = await this.programmeRepo
        .createQueryBuilder()
        .where(abilityCondition ? abilityCondition : "")
        .getCount();
    } else {
      if (user?.companyId) {
        resp = await this.programmeRepo
          .createQueryBuilder()
          .where("resp.companyId = :companyId", { companyId: user?.companyId })
          .getCount();
      }
    }
    console.log(" -------- ", resp);

    return new DataCountResponseDto(resp > 1 ? resp : undefined);
  }
}
