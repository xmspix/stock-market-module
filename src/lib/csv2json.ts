class csv2json {
  async convert(file: any) {
    let data: any = [];
    let headers: any = [];
    let records: any = [];

    await file.split(/\r?\n/).forEach((line: string) => {
      data.push(line);
    });

    headers = await data
      .shift()
      .split(",")
      .map((e: any) => e.trim().replace(/\s/g, ""));

    return (records = await data.map((e: any) =>
      headers.reduce(
        (ac: any, a: number, i: number) => ({
          ...ac,
          [a]: e.split(",")[i] ? e.split(",")[i].trim() : null,
        }),
        {}
      )
    ));
  }
}

export default new csv2json();
