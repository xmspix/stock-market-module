class csv2json {
  async convert(file: any) {
    const headers: any = file
      .split(/\r?\n/)
      .shift()
      .replace(/\s/g, "")
      .split(",");

    const records: any = file.split(/\r?\n/).slice(1, -1);

    return records.map((e: any) =>
      headers.reduce(
        (ac: any, a: number, i: number) => ({
          ...ac,
          [a]: e.split(",")[i] ? e.split(",")[i].trim() : null,
        }),
        {}
      )
    );
  }
}

export default new csv2json();
