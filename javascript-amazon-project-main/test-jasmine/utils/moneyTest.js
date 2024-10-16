import { formatCurrency } from "../../scripts/utils/money.js";

describe ('test suite: formatCurrency', ()=>
{
    it ('coverts cents into dollar', ()=>
    {
        expect(formatCurrency(2095)).toEqual('20.95')
    });
    it ('work with 0', ()=>
    {
        expect(formatCurrency(0)).toEqual('0.00')
    });
    it('round up ', ()=>
    {
        expect(formatCurrency(2000.5)).toEqual('20.01')

    });
    it('round down', () =>
    {
        expect (formatCurrency(2000.4)).toEqual('20.00')
    })
    it('negative number', () =>
    {
        expect (formatCurrency(-2000.4)).toEqual('20.00')
    })
});

