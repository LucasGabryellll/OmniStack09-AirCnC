import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

//View: serve para criar uma caixa na app
//text: Texto simples
//depois de view vem o style 
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes />
}
