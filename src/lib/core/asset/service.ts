type BlobContainer = 'content' | 'web';

export class AssetUrlResolver {
  private static cdnUrl = '/images';

  private static resolver(container: BlobContainer, filename: string) {
    return `${this.cdnUrl}/${container}/${filename}`;
  }

  public static content(filename: string): string {
    return this.resolver('content', filename);
  }

  public static web(filename: string): string {
    return this.resolver('web', filename);
  }
}
