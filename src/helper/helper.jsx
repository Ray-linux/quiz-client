import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'


export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    let res = 0
    result.filter(element => element !== undefined).map(element => {
        res = res + element
        // console.log(res);
    });
    
    // console.log(res)
    // return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
    return res
}

//export function flagResult(totalPoints, earnPoints){
  //  return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
//}

export function flagResult(totalPoints, earnPoints){
    // return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
    if(earnPoints<= 30)
      return "Your internet usage level is normal"
    else if(earnPoints>=31 && earnPoints<=49)
      return "Your internet addiction level is mid"
    else if(earnPoints>=50 && earnPoints<=79)
      return "Your internet addiction level is moderate"
    else if(earnPoints>=80 && earnPoints<=100)
      return "Your have severe dependence upon the Internet"
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}


/** get server data */
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}
