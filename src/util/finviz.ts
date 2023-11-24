import cheerio from 'cheerio';
import { createApiClient } from "../api";

const api = createApiClient();

export const finvizScreenerSymbols = async (url: string) => {
    return await api.finvizScreenerSymbols(url).then(res => {
        const $ = cheerio.load(res);
        const data = $('#screener-content > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td').text().trim();
        return data.replace(/\s\s+/g, ' ').split(' ');
    });
}

// Statements & News
export const finvizQuote = async (url: string) => {
    return await api.finvizQuote(url).then(res => {
        const $ = cheerio.load(res);
        // symbol
        const symbol = $('#ticker').text().trim();

        // statements
        const statements = $('.snapshot-table2 > tbody > tr').children().map((i, e) => $(e).text().trim()).get();
        const statementsData = { symbol: symbol, ...convertJSON(statements) };

        // news
        const news = $('.fullview-news-outer > tbody > tr').children().map((i, e) => $(e).text().trim()).get();
        const newsLinks = $('.fullview-news-outer a').map((i, e) => $(e).attr('href')).get();
        const newsData = [...news].map((e: any) => news.splice(0, 2)).map((e: any, i: number) => ({ date: e[0], title: e[1], link: newsLinks[i] }));

        return { error: false, statements: statementsData, news: newsData };
    });
}

const convertJSON = (data: any[]) => {
    const d = [...data].map((e: any) => data.splice(0, 2)).filter(String)
    return d.reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {})
}