import styled from 'styled-components';
import Dice from 'react-dice-roll';
import { useState } from 'react';
import Dice1 from "resources/images/Map/dice1.png";
import Dice2 from "resources/images/Map/dice2.png";
import Dice3 from "resources/images/Map/dice3.png";

const DiceRollerBlock = styled.div`

`;


export const DiceRoller = ({
    players,
    isRoll,
    posList,
    playerNum,
    myTurnNum,
    sessionIdValue,
    setDiceValue,
}) => {
    const [diceNum, setDiceNum] = useState();

    const onRollHandler = (value) => {
        // const myPos = posList[myTurnNum];
        const myPos = 1
        if (value > 3) {
            value = value - 3;
        }

        setDiceNum(value);
        setDiceValue(value);
        // console.log(value);
        const tempPosNum = (myPos + value) % 20;

        let nextPosList = [...posList]
        nextPosList[myTurnNum] = tempPosNum;

        const nextMinigame = Math.floor(Math.random() * 8)
        let sendData = {};

        if (myPos + value > 20) {
            nextPosList[myTurnNum] = 20;
            sendData = {
                session: sessionIdValue,
                to: [],
                data: JSON.stringify({
                    nextIsGameDone: true,
                    nextPosList: nextPosList, 
                }),
                type: 'GAME_STATE_DONE',
            }
        } else {
            sendData = {
                session: sessionIdValue,
                to: [],
                data: JSON.stringify({
                    nextPosList: nextPosList,
                    isRoll: !isRoll,
                    nextMinigame: nextMinigame,
                    nextWhatDiceNum: value,
                }),
                type: 'GAME_STATE_CHANGED',
            }
        }
        fetch("https://i8d205.p.ssafy.io:4443/openvidu/api/signal", {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:d205ssafy81"),
            "Content-type": "application/json",
          },
          body: JSON.stringify(sendData),
        });
    }

    const faces = [Dice1, Dice2, Dice3, Dice1, Dice2, Dice3];

    return (
        <DiceRollerBlock>
            <Dice
                size={100}
                disabled={false}
                rollingTime={700}
                onRoll={(value) => {
                    onRollHandler(value);
                }}
                faces={faces}
            />
            {diceNum}
        </DiceRollerBlock>
    )
}

export default DiceRoller;