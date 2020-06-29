export class AppHelper {

  public static async sleep(seconds) {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

}