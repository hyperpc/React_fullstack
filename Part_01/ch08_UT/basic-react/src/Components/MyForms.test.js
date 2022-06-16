import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MyForm from './MyForms';

describe('My Forms', ()=>{
    const setup = ()=> render(<MyForm />);
    describe('1. Init', ()=>{
        test('"Items" should have the `th`',()=>{
            setup();
            const header = screen.getByTestId('items');
            //expect(header.tagName.toLowerCase()).toBe('th');
            expect(header).toBeInTheDocument();
        });

        test('should have a `button`', ()=>{
            setup();
            const btn = screen.getByText('Add item');
            expect(btn.tagName.toLowerCase()).toBe('button');
            expect(btn).toHaveAttribute("type", "submit");
        });

        test('should have an `input`', ()=>{
            setup();
            const input = screen.getByPlaceholderText('Add item...');
            expect(input.tagName.toLowerCase()).toBe('input');
            expect(input).toHaveAttribute("type", "text");
        });

        it('`button` should have property `disabled`', ()=>{
            setup();
            const btn = screen.getByText('Add item');
            expect(btn).toHaveProperty('disabled');
        });

        it('`button` should be disabled', ()=>{
            setup();
            const btn = screen.getByRole('button');
            expect(btn).toBeDisabled();
        });
    });
    
    describe('2. action', ()=>{
        let item = 'Vancouver';
        const setup = (c)=> render(<MyForm />, c);
        let container=null;
        beforeEach(()=>{
            // setup a DOM element as a render target
            container=document.createElement('div');
            document.body.appendChild(container);
        });
        afterEach(() => {
            // cleanup on exiting
            document.body.removeChild(container);
            container = null;
        });

        /*
        * how to output the state and props in jest?
        */
        /*
        it('should update state.item', ()=>{
            act(()=>{
                setup(container);
            });
            expect(container).toMatchSnapshot();
            
            const input = screen.getByPlaceholderText('Add item...');
            act(()=>{
                input.simulate('change', {target:{value:item}});
            });
            expect(container).toMatchSnapshot();
        });
        */

        /**
         * fireEvent
         */
        it('should enable `button` (fireEvent)', ()=>{
            setup(container);
            const input = screen.getByPlaceholderText('Add item...');
            fireEvent.change(input, {target:{value:item}});

            const btn = screen.getByRole('button');
            expect(btn).not.toBeDisabled();
        });

        /**
         * userEvent
         */
        it('should enable `button` (userEvent)', ()=>{
            setup(container);
            const input = screen.getByPlaceholderText('Add item...');
            userEvent.type(input, item);

            const btn = screen.getByRole('button');
            expect(btn).not.toBeDisabled();
        });

        describe('and then clears the `input`', ()=>{
            beforeEach(()=>{
                item='';
            });

            it('should disable `button` (fireEvent)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                fireEvent.change(input, item);
    
                const btn = screen.getByRole('button');
                expect(btn).toBeDisabled();
            });

            /**
             * userEvent.type not ab;e to test empty input
             * https://github.com/testing-library/user-event/blob/main/README.md#keyboardtext-options
             */
            /*
            it('should disable `button` (userEvent)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                userEvent.type(input, item);
    
                const btn = screen.getByRole('button');
                expect(btn).toBeDisabled();
            });
            */
        });

        describe('and then submit the form', ()=>{
            beforeEach(()=>{
                //setup(container);
                item='Vancouver';
            });
            it('should enable `button` (userEvent)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                userEvent.type(input, item);
    
                const btn = screen.getByRole('button');
                expect(btn).not.toBeDisabled();
            });

            it('should render item in table (submit)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                userEvent.type(input, item);
    
                const btn = screen.getByRole('button');
                fireEvent.click(btn);

                const dom_item = screen.getByText(item);
                expect(dom_item).toBeInTheDocument();
            });

            it('should clear the `input` (submit)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                userEvent.type(input, item);
                //fireEvent.change(input, item);
    
                const btn = screen.getByRole('button');
                fireEvent.click(btn);

                //expect(input.textContent==='').toBe(true);
                expect(input).toHaveValue('');
            });

            it('should disable `button` (submit)', ()=>{
                setup(container);
                const input = screen.getByPlaceholderText('Add item...');
                userEvent.type(input, item);
                //fireEvent.change(input, item);
    
                const btn = screen.getByRole('button');
                fireEvent.click(btn);
                expect(btn).toBeDisabled();
            });
        });

    });
});
