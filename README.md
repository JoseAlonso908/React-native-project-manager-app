
npm i react-native-cli
react-native init 'yours name'

If you gonna set badge style, you have to install "react-native-elements" with 'npm i react-native-elements --save'

     "react-native-elements": "^0.19.0",
	 "react-native-tabbar-bottom": "^1.0.4"

and write in your want component 'import Tabbar from 'react-native-tabbar-bottom'
And you have to change node module in 'Tabbar' from 'import {Icon } from "native-base"' to "import { Icon } from 'react-native-elements'";

and 'react-native link'


Thank you for your saw!!!
