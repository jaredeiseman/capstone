export class Post {

  created: any = new Date();

  // constructor(public title: string, public category: string, public tags: string[], public contents: string, public draft: boolean) {}
  constructor(public title: string,
              public category: string,
              public tags: string[],
              public contents: string,
              public draft: boolean,
              public author: string) {}
}
