import { ChartData } from "../../types/Chart/ChartData";
import { getCurrencyIMG } from "../CurrencyService/getCurrencyIMG";



export const controllChartData = (usdc: any, usdt: any): ChartData[] => {

    const chartData: ChartData[] = [
        {
            id: "usdc-chart",
            flag: getCurrencyIMG("USDC"),
            background: "bg-gradient-to-r from-[#F0F0F0] via-[#E5E5E5] to-[#CFCFCF]",
            values: usdc.map((b: any) => b.toBrl).reverse(),
            date: usdc.map((d: any) => d.emmitedDate?.substring(0, 5)),
            pctChange: usdc.map((d: any) => d.pctChange).at(0),
            heading: "1 USDC = ",
            subHeading: `${usdc.map((b: any) => b.toBrl).at(0).toFixed(7)} Brazillian Real`,
            textHeading: `1 BRL = ${usdc.map((b: any) => b.toBrl).at(0).toFixed(7)} USDC`,
        },

        {
            id: "usdt-chart",
            flag: getCurrencyIMG("USDT"),
            background: "bg-gradient-to-r from-green-50 via-green-50 to-green-100",
            values: usdt.map((b: any) => b.toBrl).reverse(),
            date: usdt.map((d: any) => d.emmitedDate?.substring(0, 5)),
            pctChange: usdt.map((d: any) => d.pctChange).at(0),
            heading: "1 USDT = ",
            subHeading: `${usdt.map((b: any) => b.toBrl).at(0).toFixed(7)} Brazillian Real`,
            textHeading: `1 BRL = ${usdt.map((b: any) => b.toBrl).at(0).toFixed(7)} USDT`,
        },
    ];

    return chartData;
    
};

