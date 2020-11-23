import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faUserFriends, faEye, faExternalLinkAlt, faEnvelope,
         faExclamationCircle, faLock, faLockOpen, faCode, faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/webcomponents.scss';


export function SearchBar () {
    /* Search Bar Component */
    const [inputTxt, setInputTxt] = useState("");
    let history = useHistory();

    const handleInputChange = (event) => {
        setInputTxt(event.target.value)
    }

    const handleSearch = () => {
        history.push(`/users/${inputTxt}`)
    }

    return (
        <form onSubmit={handleSearch} className="searchBarCtn">
            <input className="searchBarInput" value={inputTxt} onChange={handleInputChange} placeholder="Búsca a usuarios aquí"/>
            <button type="submit" className="searchBarBtn" value="Submit" > <FontAwesomeIcon icon={faSearch}/> </button>
        </form>
    )
}


export function UserCard (props) {
    /* Implements a Card to show the user information, if children is given,
         the children information will be show over the top of followers information.
    Parameters:
        userData: a JSON with:
            - name, html_url, avatar_url, login, bio, email: strings
            - followers, following: int
            - children: if the element has any children, the component will show on top of followers info.
     */
    const { userData } = props

    return(
        <div className="userCardCtn">
            <UserPhotoAndName userURL={userData.html_url} avatarURL={userData.avatar_url} userName={userData.name} userLogin={userData.login}/>
            <div className="userCardInfoCtn">
                { userData.name ? <h2> {userData.login} </h2> : <p className="userCardUncompletedName"> Este usuario aún no completa su nombre </p>}
                <IconWithText leftIcon={<FontAwesomeIcon icon={faEnvelope}/>} text={`${userData.email ? userData.email : "no específicado"}`}/>
                <p className="userCardBio">{ userData.bio ? userData.bio: "Este usuario aún no completa su biografía" }</p>
                {props.children}
                <div className="userCardFollowersCtn">
                    <IconWithText leftIcon={<FontAwesomeIcon icon={faUserFriends}/>} text={`${userData.followers} seguidores`}/>
                    <IconWithText leftIcon={<FontAwesomeIcon icon={faUser}/>} text={`${userData.following} siguiendo`}/>
                </div>
            </div>
        </div>
    )
}


export function RepoCard (props) {
    /* Card to show the respository information.
        Parameters:
        - repoData: JSON with:
             name, html_url, language: strings
             stargazers_count, open_issues_count, watchers: int
             private: boolean
     */
    const { repoData } = props

    return(
        <div className="repoCardCtn" >
            <a href={repoData.html_url} className="repoCardTitleCtn">
                <IconWithText leftIcon={<FontAwesomeIcon icon={faExternalLinkAlt}/>} text={repoData.name}/>
                <IconWithText leftIcon={<FontAwesomeIcon icon={ faStar}/>} text={`${repoData.stargazers_count}`}/>
            </a>
            <p>{repoData.description} </p>
            <div className="repoCardStatistics">
                <IconWithText leftIcon={<FontAwesomeIcon icon={ faCode}/>} text={`${repoData.language ? repoData.language: "No identificado"}`}/>
                <IconWithText leftIcon={<FontAwesomeIcon icon={ repoData.private ? faLock : faLockOpen}/>} text={`${repoData.private? "privado":"público"}`}/>
                <IconWithText leftIcon={<FontAwesomeIcon icon={faExclamationCircle}/>} text={`${repoData.open_issues_count} issues`}/>
                <IconWithText leftIcon={<FontAwesomeIcon icon={faEye}/>} text={`${repoData.watchers} observadores`}/>
            </div>
        </div>
    )
}


export function UserPhotoAndName (props) {
     /* i made this component to show the avatar and the name of user
        in other sites of the webpage, because, like github, every user avatar
        and username redirects to the profile. */
    /* Parameters:
        - avatarURL: avatar link
        - userURL: link to the user profile
        - userName: name of the user
        - userAcc: if not User Name provided, then show the username.
        - row: if row is provided, then the name will locate next to the avatar url,
               if not, the name will locate under it.
     */
    return (
        <a href={props.userURL} className={`userPhotoAndNameCtn ${props.row && "row"}`}>
            <img src={props.avatarURL} className="userAvatar"/>
            {   props.userName ?
                <h1>{props.userName}</h1>
            :
                <h1>{props.userLogin}</h1>
            }
        </a>
    )
}


export function IconWithText (props) {
    /* Implements a single line of text with icon on the left or/and the right of it.
        Parameters:
        - leftIcon: icon to asign into the left of the text (icon)
        - rightIcon: icon to asign into the right of the text (icon)
        - text: text to show. (string)
     */
    return (
        <div className="iconWithTextCtn">
            {props.leftIcon &&
                <div className="iconCtn">
                    {props.leftIcon}
                </div>
            }
            <p>{props.text}</p>

            {props.rightIcon &&
                <div className ="iconCtn">
                    {props.rightIcon}
                </div>
            }
        </div>
    )
}