import React from 'react';
import './chat.scss';
// import ScrollToBottom from 'react-enter id-to-bottom';
import { Provider } from "react-redux";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import DynamButtons from './InputMessage/dynamicButton'
import store from "../../redux/store";
import { SocialIcon } from 'react-social-icons';

const styles = ({
	button: {
		height: 50,
		backgroundColor: '#F2C84B',
		variant: "solid",
		marginTop: 5
	},
	icons: {
		fill: '#50D4F2'
	},
	card: {
		backgroundColor: '#212121',
		color: "#F2C84B",
		variant: "solid",
		width: "100%",
		textAlign: 'center',
		padding: '5%',
		// marginTop: '5%',
		// marginRight: "10%",
		// marginLeft: "15%",
		// marginTop: 50,
		// backgroundColor: "#212121",	
		backgroundSize: "cover",
		// backgroundImage: "url(https://www.getty.edu/art/exhibitions/cisneros/images/landing/4_Fiaminghi_Alternado2_x1024.jpg)",
	},

	card2: {
		variant: "solid",
		padding: 30,
		marginRight: 150,
		marginLeft: 100,
		// marginTop: 50, 
		backgroundColor: "#212121",	
		
		}
  })

export const Chat = (props) => {
	
	// const [response, setResponse] = useState('');// const [roomName, setRoomName] = useState("");

	// const [ idUserLogged, setIdUserLogged ] = useState(0)
	// const [inRoom, setInRoom] = useState(false);

	// console.log(props.idUserLogged)


	// const { idOrigin, messages } = props;
	// const dispatch = useDispatch();
// var check = 0
// 	useEffect(() => {
// 		setIdUserLogged(props);
// 		console.log(check += check)
// 		});
		
	return (
		<>
			
			<div className="appendBtn">
				<Grid item xs={12}>
					<Card className={"roomCard"} style={styles.card}>
					
						<Provider store={store}>
						
							<DynamButtons {...props}/>
						</Provider>
					</Card>
				</Grid>
			</div>		
			
			<div>
			<div className="iconOrder">
			<SocialIcon className="socialicons" url="https://github.com/MartinScriblerus" style={styles.icons}/>
			<SocialIcon className="socialicons" url="https://twitter.com/A00PE"  style={styles.icons} />
			<SocialIcon className="socialicons" url="https://www.linkedin.com/in/matthew-reilly-91b316142/" style={styles.icons} />
		</div>
		</div>
		   

	
		</>
	);
};
