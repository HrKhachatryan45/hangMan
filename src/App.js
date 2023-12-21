import React, {useEffect, useState} from 'react';
import _ from 'lodash'
import {ReactComponent as Face} from "./assets/image/face.svg";

function App(props) {
    const words = [
        "apple", "sun", "ocean", "mountain", "joy", "freedom", "breeze", "dream", "laughter", "serenity",
        "abandon", "ability", "absence", "academy", "account", "accuse", "achieve", "acoustic", "adapt", "addict",
        "adequate", "adjust", "adventure", "aerial", "affair", "against", "agile", "airplane", "alchemy", "alert",
        "amazing", "anchor", "ancient", "angel", "answer", "apology", "aquarium", "arctic", "army", "arrival",
        "awesome", "balance", "bamboo", "banana", "beacon", "beautiful", "benevolent", "bewilder", "bliss", "blossom",
        "bravery", "breathe", "brilliant", "butterfly", "cactus", "calm", "candle", "captivate", "celebrate", "cerulean",
        "challenge", "change", "charisma", "chase", "cheer", "chocolate", "cinnamon", "clarity", "coconut", "courage",
        "creative", "crimson", "crystal", "curiosity", "dazzle", "delight", "desire", "destiny", "diamond", "discovery",
        "divine", "dragonfly", "effervescent", "elegance", "embrace", "enchantment", "endless", "epiphany", "essence",
        "eternity", "exquisite", "fantastic", "fascinate", "feather", "firefly", "flourish", "freesia", "gentle", "glisten",
        "gratitude", "harmony", "heavenly", "hope", "illuminate", "imagine", "infinity", "innocence", "inspire", "jubilant",
        "kaleidoscope", "kindness", "laugh", "lavender", "legend", "light", "lively", "love", "luminous", "majestic",
        "marvel", "meditate", "mesmerize", "miracle", "moment", "moonlight", "morning", "mystic", "nature", "nurture",
        "oasis", "oblivion", "oracle", "orchestra", "paradise", "passion", "patience", "peace", "perception", "perennial",
        "petal", "phenomenon", "playful", "pleasure", "poetry", "pristine", "pure", "quintessence", "radiance", "rejoice",
        "renew", "resonate", "revitalize", "rhapsody", "ripple", "savor", "serendipity", "serene", "silhouette", "soothe",
        "sparkle", "splendid", "spontaneous", "starlight", "sublime", "sunset", "surprise", "synergy", "tranquil", "triumph",
        "twilight", "umbrella", "universe", "utopia", "vibrant", "vision", "vivid", "wanderlust", "whisper", "wonder", "zenith"
    ];
    const letters= Array.from({ length: 26 }, (_, index) => String.fromCharCode(index + 65))
    const [cages,setCages]=useState([])
    const [randomIndex,setRandomIndex]=useState(_.random(0,words.length-1))
    const [randomWord,setRandomWord]=useState(words[randomIndex])
    const [hidden,setHidden]=useState(randomWord.length)
    const [opacity1,setOpacity1]=useState(0)
    const [opacity2,setOpacity2]=useState(0)
    const [opacity3,setOpacity3]=useState(0)
    const [opacity4,setOpacity4]=useState(0)
    const [opacity5,setOpacity5]=useState(0)
    const [opacity6,setOpacity6]=useState(0)
    const [opacity7,setOpacity7]=useState(0)
    const [opacity8,setOpacity8]=useState(0)
    const [opacity9,setOpacity9]=useState(0)
    const [opacity10,setOpacity10]=useState(0)
    const [inCorrect,setInCorrect]=useState(0)
    const [dis,setDis]=useState(false)
    const [status,setStatus]=useState('')
    const [disabledKeys,setDisabledKeys]=useState([])
    useEffect(() => {
        const hiddenNew=hidden
        const newCages=Array.from({length:hiddenNew},(_,index)=>(
            <div id={'wordBox'} key={index}></div>
        ))
        setCages([...newCages])
    }, [hidden]);


    const handleLetter=(letter,index2)=>{

        if (disabledKeys.includes(index2)) {
            return; // Do nothing if the letter is already disabled
        }
        const updatedCages=([...cages])
        let incorrectCount = inCorrect;
        let letterFound = false;
        const isLetterDisabled =disabledKeys.includes(index2)

        if(!isLetterDisabled) {
           for (let i = 0; i < hidden; i++) {
               if (randomWord[i] === letter.toLowerCase()) {
                   updatedCages[i] = <div id={'guessedWordBox'} key={i}>{letter}</div>
                   letterFound = true
                   letters.map((item, index) => {
                       if (index === index2) {
                           document.getElementsByClassName('key')[index2].style.color = 'lightgreen'
                           setDisabledKeys((prevKeys)=>[...prevKeys, index]);


                       }

                   })
               }
           }

           if (!letterFound) {
               incorrectCount += 1;
               setInCorrect(incorrectCount);
               letters.map((item, index) => {
                   if (index === index2) {
                       document.getElementsByClassName('can')[index2].style.display = 'block'
                       setDisabledKeys((prevKeys)=>[...prevKeys, index]);

                   }
               })

           }


           const guessedWord = updatedCages.map((cages) => cages.props.children).join('')
           // updatedCages-i vra map enq frum ev cages.props.children-y kpnum e nra piji elementnerin isk joiny kpcnum e mi stringi mej
           if (guessedWord === randomWord) {
               setDis(true)
               setStatus('You Won!')
           }
           switch (incorrectCount) {
               case 1:
                   setOpacity1(1);
                   break;
               case 2:
                   setOpacity2(1);
                   break;
               case 3:
                   setOpacity3(1);
                   break;
               case 4:
                   setOpacity4(1);
                   break;
               case 5:
                   setOpacity5(1);
                   break;
               case 6:
                   setOpacity6(1);
                   break;
               case 7:
                   setOpacity7(1);
                   break;
               case 8:
                   setOpacity8(1);
                   break;
               case 9:
                   setOpacity9(1);
                   setOpacity10(1);
                   setDis(true)
                   setStatus('You Lose')
                   break;
               default:
                   break;
           }

       }
        setCages(updatedCages)

    }

    const handleRefresh=()=>{
        const newRandomWord= words[_.random(0, words.length - 1)];
        setRandomWord(newRandomWord)
        setDis(false)
        setDisabledKeys([])
        const hiddenNew=newRandomWord.length
        const newCages=Array.from({length:hiddenNew},(_,index)=>(
            <div id={'wordBox'} key={index}></div>
        ))


        setCages([...newCages])
        letters.map((item,index)=>{
            document.getElementsByClassName('key')[index].style.color='#434B52'
            document.getElementsByClassName('can')[index].style.display='none'
        })
        setOpacity1(0)
        setOpacity2(0)
        setOpacity3(0)
        setOpacity4(0)
        setOpacity5(0)
        setOpacity6(0)
        setOpacity7(0)
        setOpacity8(0)
        setOpacity9(0)
        setOpacity10(0)
        setInCorrect(0)

    }
    useEffect(() => {
        console.log(disabledKeys)
    }, [disabledKeys]);
    return (
        <div>
            <div className={'main'}>
                <div className={'hang-board'}>
                    <div className={'instructions'}>
                    </div>
                    <div className={'hang-stick'}>
                        <Face style={{opacity:`${opacity10}`}} id={'face'}/>
                        <div style={{opacity:`${opacity9}`}} id={'line6'}></div>
                        <div style={{opacity:`${opacity8}`}} id={'line5'}></div>
                        <div style={{opacity:`${opacity7}`}} id={'line4'}></div>
                        <div style={{opacity:`${opacity6}`}} id={'line3'}></div>
                        <div style={{opacity:`${opacity5}`}} id={'line2'}></div>
                        <div style={{opacity:`${opacity4}`}} id={'circle'}></div>
                        <div style={{opacity:`${opacity3}`}} id={'line1'}></div>
                        <div style={{opacity:`${opacity2}`}} id={'stick4'}></div>
                        <div style={{opacity:`${opacity1}`}} id={'stick3'}></div>
                        <div id={'stick2'}></div>
                        <div id={'stick1'}></div>
                    </div>
                    <div className={'guessWord'}>
                        <div className={'word_hidden'}>
                            {cages}
                        </div>
                    </div>
                    <div className={'keyboard'}>
                        {letters.map((item,index)=>(
                            <div className={'key'} onClick={()=>handleLetter(item.toLowerCase(),index)} key={index}>{item}
                                <section className={'can'}></section>
                            </div>
                        ))}
                    </div>
                </div>
                {dis?<div className={'status'}>
                    <h2>{status}</h2>
                    <button onClick={handleRefresh}>{status==="You Lose"?"New Game":"Next"}</button>
                    <h2>The Word Was {randomWord}</h2>
                </div>:null}
            </div>
        </div>
    );
}

export default App;

