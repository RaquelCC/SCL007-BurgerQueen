import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './menu.json';
import { pedidosRef } from './components/firebase';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App menu={data} pedidosRef={pedidosRef}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('input guarda el nombre', () => {  
  const appComponent = mount(<App menu={data} pedidosRef={pedidosRef}/>);
  const waitersComponent = appComponent.find('Waiters');
  waitersComponent.find('#customer-name').simulate('change', {
    target: {
      value: "gatito"
    }
  })
  expect(waitersComponent.state().inputName).toBe('gatito');
});

it('agrega cafe americano', () => {  
  const appComponent = mount(<App menu={data} pedidosRef={pedidosRef}/>);
  const waitersComponent = appComponent.find('Waiters');
  waitersComponent.find('#customer-name').simulate('change', {
    target: {
      value: "gatito"
    }
  })
  waitersComponent.find("#add-customer-button").simulate('click');
  const waitersComponent2 = appComponent.find('Waiters');
  // waitersComponent.setState({
  //   ...waitersComponent.state(),
  //   currentOrder: {
  //     ...waitersComponent.state().currentOrder,
  //     customer: 'gatito',
  //   }
  // })
  // waitersComponent.update();
  // console.log(waitersComponent.state())
  waitersComponent2.find('.food-menu').first().simulate("click");

  const waitersComponent3 = appComponent.find('Waiters');
  waitersComponent3.find('.food-menu').first().simulate("click");
  //console.log(waitersComponent3.state().currentOrder);
  expect(waitersComponent3.state().currentOrder.contents[0].itemName).toBe('cafe americano');
});
