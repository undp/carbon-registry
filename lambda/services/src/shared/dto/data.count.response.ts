export class DataCountResponseDto {
  total: number;
  lastUpdate: number;

  constructor(total: number) {
    this.total = total;
    this.lastUpdate = Math.round(Date.now() / 1000);
  }
}
