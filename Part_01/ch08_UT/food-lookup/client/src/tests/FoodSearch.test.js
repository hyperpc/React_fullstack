import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FoodSearch from '../FoodSearch';
//import Client from '../Client';

jest.mock('../Client.js');
const Client = require('../Client');
const onFoodClick = jest.fn();
// set mock result
//Client.mockImplementation(()=>{});

describe('FoodSearch', () => {
  // ... initial state specs
  let setup = ()=>render(<FoodSearch/>);
  let setupWithClick = ()=>render(<FoodSearch onFoodClick={onFoodClick} />);

  describe('user populates search field', () => {
    let search_text = "brocc";
    beforeEach(() => {
      // ... simulate user typing "brocc" in input
    });
    afterEach(()=>{
      Client.search.mockClear();
      onFoodClick.mockClear();
    });

    // ... specs
    test('should not display the remove icon', ()=>{
      setup();
      const remove_icon = screen.getByRole('i', {class:/remove/i});
      expect(remove_icon).not.toBeInTheDocument();
    });
    it('should display zero row at beginning', ()=>{
      setup();
      const tbody = screen.getByRole('tbody');
      const tr = within(tbody).getByRole('tr');
      expect(tr).not.toBeInTheDocument();
    });
    it('should display search `input`', ()=>{
      setup();
      const thead=screen.getAllByRole('thead');
      const input = within(thead).getByRole('input',{class:/prompt/i});
      expect(input).toBeInTheDocument();
    });
    it('should display the search icon', ()=>{
      setup();
      const thead=screen.getAllByRole('thead');
      const search_icon = within(thead).getByRole('i',{class:/search/i});
      expect(search_icon).toBeInTheDocument();
    });
    test('should display search `input` with value', ()=>{
      setup();
      const thead=screen.getAllByRole('thead');
      const input = within(thead).getByRole('input',{class:/prompt/i});
      userEvent.type(input, search_text);

      expect(input).toHaveValue(search_text);
    });
    it('should display the remove icon',()=>{
      setup();
      const thead=screen.getAllByRole('thead');
      const input = within(thead).getByRole('input',{class:/prompt/i});
      userEvent.type(input, search_text);

      const remove_icon = screen.getByRole('i', {class:/remove/i});
      expect(remove_icon).toBeInTheDocument();
    });
    it('should call `Client.search()` with value',()=>{
      setup();
      const thead=screen.getAllByRole('thead');
      const input = within(thead).getByRole('input',{class:/prompt/i});
      userEvent.type(input, search_text);

      const invocations = Client.search.mock.calls;
      console.log("First call: " + invocations[0]);
      console.log("All calls: " + invocations);
      expect(invocations[0][0]).toEqual(search_text);
    });

    describe('and API returns results', () => {
      const foods = [{
        description:'Broccolini',
        kcal:'100',
        protein_g:'11',
        fat_g:'21',
        carbohydrate_g:'31'
      },{
        description:'Broccoli rabe',
        kcal:'200',
        protein_g:'12',
        fat_g:'22',
        carbohydrate_g:'32'
      }];
      beforeEach(() => {
        // ... simulate API returning results
      });

      // ... specs
      test('should display two rows',()=>{
        setup();
        const thead=screen.getAllByRole('thead');
        const input = within(thead).getByRole('input',{class:/prompt/i});
        userEvent.type(input, search_text);
  
        const invocations = Client.search.mock.calls;
        const cb = invocations[0][1];
        cb(foods);

        const tbody = screen.getByRole('tbody');
        const trs = within(tbody).getAllByRole('tr');
        expect(trs.length).toEqual(2);
      });
      it('should render description of first food',()=>{
        setup();
        const thead=screen.getAllByRole('thead');
        const input = within(thead).getByRole('input',{class:/prompt/i});
        userEvent.type(input, search_text);
  
        const invocations = Client.search.mock.calls;
        const cb = invocations[0][1];
        cb(foods);
        expect(foods[0].description).toBeInTheDocument();
      });
      it('should render description of second food',()=>{
        setup();
        const thead=screen.getAllByRole('thead');
        const input = within(thead).getByRole('input',{class:/prompt/i});
        userEvent.type(input, search_text);
  
        const invocations = Client.search.mock.calls;
        const cb = invocations[0][1];
        cb(foods);
        expect(foods[1].description).toBeInTheDocument();
      });

      describe('then user clicks food item', () => {
        beforeEach(() => {
          // ... simulate user clicking food item
        });

        // ... specs
        test('should call prop `onFoodClick` with `food`',()=>{
          setupWithClick();
          const thead=screen.getAllByRole('thead');
          const input = within(thead).getByRole('input',{class:/prompt/i});
          userEvent.type(input, search_text);
    
          const invocations = Client.search.mock.calls;
          const cb = invocations[0][1];
          cb(foods);
          
          const tbody = screen.getByRole('tbody');
          const trs = within(tbody).getAllByRole('tr');
          fireEvent.click(trs[0]);
          
          expect(onFoodClick.mock.calls[0]).toEqual([foods[0]]);
        });
      });

      describe('then user types more', () => {
        beforeEach(() => {
          // ... simulate user typing "x"
        });

        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
          });

          // ... specs
          test('should display zero row again',()=>{
            setupWithClick();
            const thead=screen.getAllByRole('thead');
            const input = within(thead).getByRole('input',{class:/prompt/i});
            userEvent.type(input, search_text+'x');
      
            const invocations = Client.search.mock.calls;
            const cb = invocations[0][1];
            cb([]);
            
            const tbody = screen.getByRole('tbody');
            const tr = within(tbody).getByRole('tr');
            
            expect(tr).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
