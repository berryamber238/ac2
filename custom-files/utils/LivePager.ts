export class LivePager {
  private isHomeScreen: boolean;
  private isLocalScreen: boolean;
  private localUid: number;
  private uisList: number[];
  private liveId: string;

  constructor(
    isHomeScreen: boolean,
    isLocalScreen: boolean,
    localUid: number,
    uisList: number[],
    liveId: string
  ) {
    this.isHomeScreen = isHomeScreen;
    this.isLocalScreen = isLocalScreen;
    this.localUid = localUid;
    this.uisList = uisList;
    this.liveId = liveId;
  }

  public getIsHomeScreen(): boolean {
    return this.isHomeScreen;
  }

  public setIsHomeScreen(isHomeScreen: boolean): void {
    this.isHomeScreen = isHomeScreen;
  }

  public getIsLocalScreen(): boolean {
    return this.isLocalScreen;
  }

  public setIsLocalScreen(isLocalScreen: boolean): void {
    this.isLocalScreen = isLocalScreen;
  }

  public getLocalUid(): number {
    return this.localUid;
  }

  public setLocalUid(localUid: number): void {
    this.localUid = localUid;
  }

  public getUisList(): number[] {
    return this.uisList;
  }

  public setUisList(uisList: number[]): void {
    this.uisList = uisList;
  }

  public getLiveId(): string {
    return this.liveId;
  }

  public setLiveId(liveId: string): void {
    this.liveId = liveId;
  }
}
