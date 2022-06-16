//import { render, screen } from '@testing-library/react';
import Modash from './Modash';

describe('Modash', () => {
    describe('`truncate()`', () => {
        const string = 'there was one catch, and that was CATCH-22';

        it('`truncate()`: truncates a string', ()=>{
            const expected = 'there was one catch...';
            expect(Modash.truncate(string, 19))
            .toEqual(expected);
        });
        
        test('no-ops if <= length', ()=>{
            expect(Modash.truncate(string, string.length))
            .toEqual(string);
        });
    });

    describe('`capitalize()`', ()=>{
        it('capital first letter and lowercase rest', ()=>{
            const string = 'there was one catch, and that was CATCH-22';
            expect(
                Modash.capitalize(string)                
            ).toEqual('There was one catch, and that was catch-22');
        });
    });

    describe('`camelCase()`', ()=>{
        it('camelizes string with spaces', ()=>{
            const string = 'customer responded at';
            expect(Modash.camelCase(string))
            .toEqual('customerRespondedAt');
        });
        it('camelizes string with underscores', ()=>{
            const string = 'customer_responded_at';
            expect(Modash.camelCase(string))
            .toEqual('customerRespondedAt');
        });
        it('camelizes string with dash', ()=>{
            const string = 'customer-responded-at';
            expect(Modash.camelCase(string))
            .toEqual('customerRespondedAt');
        });
    });
});
