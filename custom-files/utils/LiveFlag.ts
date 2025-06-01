export class LiveFlag {
  private liveId: string;
  private createAt: number;

  constructor(liveId: string, createAt: number) {
    this.liveId = liveId;
    this.createAt = createAt;
  }

  public getLiveId(): string {
    return this.liveId;
  }

  public setLiveId(liveId: string): void {
    this.liveId = liveId;
  }

  public getCreateAt(): number {
    return this.createAt;
  }

  public setCreateAt(createAt: number): void {
    this.createAt = createAt;
  }
}
