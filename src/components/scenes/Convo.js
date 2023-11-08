import React from "react"
import "./Convo.css"
import Dialog from "../common/Dialog"
import ThemedButton from "../common/ThemedButton"
import { useState } from "react"
import { setSceneAction } from "../../actions"
import { testConvo } from "../../convos/convos"

const Convo = ({ gameData, dispatch, conversation }) => {
  // Set the current conversation to state, then change line in state

  const loadNextLevel = () => {
    dispatch(setSceneAction())
  }

  const [line, setLine] = useState(0)

  //   const testConvo = basicConvos.testConvo

  const [convo, setConvo] = useState(testConvo)

  const playNextText = () => {
    if (line < convo.length - 1) {
      setLine(line + 1)
    } else {
      setLine(0)
      loadNextLevel()
    }
  }
  console.log("THE CONVO: ", testConvo, line, testConvo[0].actions[0])

  const executeChoice = (action) => {
    switch (action.result) {
      case "reward":
        // dispatch(setMyData(action.reward))
        break
      case "dialog":
        // setConvo(action.result)
        console.log("choice actions:", action)
        setConvo(action.resultLocation)
        break
      case "extend":
        // setConvo(...convo.splice(WHATEVERGOESHERE action.result))
        break
      default:
        console.log(`executeChoice on dialog: default case reached`)
    }
  }

  return (
    <div className="convo-scene">
      <div className="convo-container">
        <div
          className={`convo-img-container convo-img-container-${convo[line].pos}`}
        >
          <img
            className="convo-img"
            src={`/actors/${convo[line].actor}.png`}
            alt={`${convo[line].actor} Avatar`}
          />
        </div>
        <div
          className={`convo-dialog-container convo-dialog-container-${convo[line].pos}`}
        >
          <div className="convo-dialog">
            <h1>{convo[line].actor}</h1>
            <div className="dialog-text">
              <Dialog
                size="30"
                myText={convo[line].text}
                key={convo[line].text}
              />
            </div>
            <div className="convo-actions">
              <div className="action-buttons">
                {convo[line].actions
                  ? convo[line].actions.map((action, index) => {
                      return (
                        <ThemedButton
                          key={index}
                          text={action.text}
                          onClick={() => executeChoice(action)}
                        />
                      )
                    })
                  : null}
              </div>
              <ThemedButton
                className="convo-next-btn"
                text={`->`}
                onClick={playNextText}
              />
            </div>
          </div>
          {/* <div className="convo-dialog">
            <h1>{convo[line].actor}</h1>
            <Dialog
              size="30"
              myText={convo[line].text}
              key={convo[line].text}
            />
            {convo[line].actions
              ? convo[line].actions.map((action) => {
                  return (
                    <ThemedButton
                      text={action.text}
                      onClick={() => executeChoice(action)}
                    />
                  )
                })
              : null}
            <ThemedButton text={`->`} onClick={playNextText} />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Convo
