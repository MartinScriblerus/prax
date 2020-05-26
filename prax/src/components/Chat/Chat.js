import React, { useEffect, useState } from 'react';
import './chat.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Provider } from "react-redux";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import DynamButtons from './InputMessage/dynamicButton'
import store from "../../redux/store";

const styles = ({
	button: {
		height: 50,
		backgroundColor: '#85b1d7',
		variant: "solid",
		marginTop: 5
	},
	card: {
		backgroundColor: "#041621",	
		color: "#aaf",
		variant: "solid",
		width: "70%",
		marginRight: "15%",
		marginLeft: "15%",
		marginTop: 80,
	
	},
	card2: {
		variant: "solid",
		padding: 30,
		marginRight: 150,
		marginLeft: 100,
		marginTop: 50 
		}
  })

export const Chat = (props) => {
	
	// const [response, setResponse] = useState('');// const [roomName, setRoomName] = useState("");

	const [ idUserLogged, setIdUserLogged ] = useState(0)
	// const [inRoom, setInRoom] = useState(false);

	console.log(props.idUserLogged)
console.log("tktktktktktktktktk")

	const { idOrigin, messages } = props;
	// const dispatch = useDispatch();
var check = 0
	useEffect(() => {
		setIdUserLogged(props);
		console.log(idUserLogged);
		console.log(idOrigin);
		console.log(messages);
		console.log(check += check)
		});
		
	return (
		<>
			<ScrollToBottom className="scroll-to-bottom" followButtonClassName="button-scroll">
			<div className="appendBtn">
				<Grid item xs={12}>
					<Card className={"roomCard"} style={styles.card}>
						<Provider store={store}>
							<DynamButtons {...props}/>
						</Provider>
					</Card>
				</Grid>
			</div>		
				</ScrollToBottom>
			<div>
		</div>
		</>
	);
};
