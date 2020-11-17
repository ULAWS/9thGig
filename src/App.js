
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(){
    super()
    this.state={
      upvoted:0,
      downvoted:0,
      darkMode:0
    }
  }

  componentDidMount(){
    function pad(num, size) {     //helper to make the new int string
      var s = "00" + num;
      return s.substr(s.length-size);
  }

  //listeners for upvote, dowvote here

    let upButton = document.getElementsByClassName("up");
    let downButton = document.getElementsByClassName("down");
    for(let i in upButton){
      if(upButton[i].innerHTML!==undefined){
        upButton[i].addEventListener('click',(e)=>{
          e.preventDefault();
          var article = upButton[i].closest("article");
          var points = article.querySelector(".point").innerHTML;
          var numPoints = parseInt(points.replace(" points","").replace(",",""));
          if(!this.state.upvoted){         //if not already upvoted, then add 1, else nothing
            
            var newPoints = numPoints+1;
            if(this.state.downvoted) newPoints = numPoints+2;     //if downvoted, then add 2
            let finalNum = newPoints.toString();
            if(newPoints>999){
              let lastDigits = pad(newPoints%1000,3);
              let firstDigits = parseInt(newPoints/1000);
              finalNum = firstDigits + "," + lastDigits;
            }
            finalNum+=" points";
            article.querySelector(".point").innerHTML = finalNum;

            upButton[i].style.background = "#4fe669";
            downButton[i].style.background = "#fff";
            this.setState({upvoted:1,downvoted:0});

            upButton[i].classList.add("rotateOnce");    //animation
            downButton[i].classList.remove("bounceOnce");
          }
          else{
            var newPoints = numPoints-1;
            let finalNum = newPoints.toString();
            if(newPoints>999){
              let lastDigits = pad(newPoints%1000,3);
              let firstDigits = parseInt(newPoints/1000);
              finalNum = firstDigits + "," + lastDigits;
            }
            finalNum+=" points";
            article.querySelector(".point").innerHTML = finalNum;
            upButton[i].style.background = "#fff";
            this.setState({upvoted:0,downvoted:0});

            upButton[i].classList.remove("rotateOnce");
          }
        })
        
      }
      
    }
    
    for(let i in downButton){
      if(downButton[i].innerHTML!==undefined){
        downButton[i].addEventListener('click',(e)=>{
          e.preventDefault();
          var article = downButton[i].closest("article");
            var points = article.querySelector(".point").innerHTML;
            var numPoints = parseInt(points.replace(" points","").replace(",",""));
          if(!this.state.downvoted){         //if not already upvoted, then add 1, else nothing 
            var newPoints = numPoints-1;
            if(this.state.upvoted) newPoints = numPoints-2;     //if downvoted, then add 2
            let finalNum = newPoints.toString();
            if(newPoints>999){
              let lastDigits = pad(newPoints%1000,3);
              let firstDigits = parseInt(newPoints/1000);
              finalNum = firstDigits + "," + lastDigits;
            }
            finalNum+=" points";
            article.querySelector(".point").innerHTML = finalNum;
            upButton[i].style.background = "#fff";
            downButton[i].style.background = "rgb(216, 36,36)";
            this.setState({upvoted:0,downvoted:1});
            downButton[i].classList.add("bounceOnce");    //animation
            upButton[i].classList.remove("rotateOnce");
          }
          else{
            var newPoints = numPoints+1;
            let finalNum = newPoints.toString();
            if(newPoints>999){
              let lastDigits = pad(newPoints%1000,3);
              let firstDigits = parseInt(newPoints/1000);
              finalNum = firstDigits + "," + lastDigits;
            }
            finalNum+=" points";
            article.querySelector(".point").innerHTML = finalNum;
            downButton[i].style.background = "#fff";
            this.setState({upvoted:0,downvoted:0});
            downButton[i].classList.remove("bounceOnce");    //animation
          }
        })
        
      }
      
    }

    //listener for comment button and save and cancel
    let commentButton = document.getElementsByClassName("comment");
    for(let i in commentButton){
      if(commentButton[i].innerHTML!==undefined){
        commentButton[i].addEventListener('click',(e)=>{
          e.preventDefault();
          console.log("in comment")
          var article = commentButton[i].closest("article");
          article.innerHTML+=`
            <input id="input${i}" style="width:60%;height:50px;margin-top:15px;" placeholder="Write your comment...">
            </input>
            <div id="commentContainer${i}" style="display:flex;flex-direction:column;width:12%;height:54px;margin-top: 15px;
            margin-right: 23%;float:right;justify-content: space-evenly;">
            <button id="saveComment${i}">Save</button>
            <button id="cancelComment${i}">Cancel</button>
            </div>
          `
          //add listener for save and cancel
          let input = document.getElementById("input"+i);
          let commentContainer = document.getElementById("commentContainer"+i);
          let savebutton = document.getElementById("saveComment"+i);
          let cancelbutton = document.getElementById("cancelComment"+i);
          savebutton.addEventListener('click',(e)=>{
            e.preventDefault();
            let comment = input.value;
            input.remove();
            commentContainer.remove();
            article.innerHTML+=`
            <div style="width:60%;height:50px;margin-top:15px;border:none;border-radius:10px;background:#dedede;padding:5px 15px;">
            ${comment}
            </div>
            `
          })

          cancelbutton.addEventListener('click',(e)=>{
            e.preventDefault();
            input.remove();
            commentContainer.remove();
          })
      })
    }
  }

  
  //listnenr for dark theme
  let darkButton = document.querySelector(".darkmode-toggle");
  darkButton.addEventListener('click',e=>{
    e.preventDefault();
    if(this.state.darkMode){    //if dark is on, set to light
      this.setState({darkMode:0});
      document.querySelector("body").classList.remove("theme-dark");
      darkButton.style.backgroundPosition = "-330px 0";
    }
    else{
      this.setState({darkMode:1});
      document.querySelector("body").classList.add("theme-dark");
      darkButton.style.backgroundPosition = "-330px -30px";
    }
  })
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
      <a className="logo" href="/">9GAG</a>
        <div className="nav-wrap">
        <nav className="nav-menu">
        <ul className="secondary">
          <li><a href="https://bit.ly/ShuffleNav" target="_blank" className="">🔀 Shuffle</a></li>
          <li><a href="https://bit.ly/2WbA6LN" target="_blank" className="">📱 Get App</a></li>
          <li><a href="https://bit.ly/2GEH9WG" target="_blank" className="">🛒 Shop</a></li>
          <li><a href="https://bit.ly/2QAAdQb" target="_blank" className="">🔞</a></li>
          <li><a href="https://bit.ly/3e0HsLD" target="_blank" className="new">US Election</a></li>
          <li><a href="https://bit.ly/36V3e1S" target="_blank" className="new">Among Us</a></li>
          <li><a href="https://bit.ly/2YR83VH" className="">Ask Brazil</a></li>
          <li><a href="https://bit.ly/2M2bDF3" className="">Motorbike</a></li>
          <li><a href="https://bit.ly/2QFHSfU" className="">Shower Thoughts</a></li>
          <li><a href="https://bit.ly/3baWagg" target="_blank" className="">Cat</a></li>
          <li><a href="https://bit.ly/2WBP6Fx" target="_blank" className="">ಠ_ಠ</a></li>
          </ul>
          </nav>
        </div>
        <div className="function-wrap">
          <div className="general-function">
            <a className="darkmode-toggle" href="https://bit.ly/ShuffleNav">Dark mode</a>
            <a className="search" href="/">Search</a>
            </div><div className="visitor-function">
              <button className="board-system__too-nav-button closed" data-v-49695a85="">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" role="presentation" icon-name="Boards" data-v-49695a85="">
                  <g fill="currentColor"><path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM7 9H5V7H7V9ZM11 9H9V7H11V9ZM15 9H13V7H15V9Z" data-v-49695a85="">
                    </path></g></svg></button>
                    <a className="btn-mute" href="/">Log in</a>
                    <a className="btn-primary" href="/">Sign up</a>
                    </div>
                    <div className="user-function" style={{display: "none"}}>
                      <div className="notification">
                        <a className="bell" href="/"></a></div>
                        <div className="avatar"><a className="avatar-container" href="/"><img alt="Avatar"></img>
                          </a></div>
                        <div className="upload"><a className="btn-primary" href="/">Upload</a></div>
                        </div>
                        </div>
      </header>

      <div id="container">
        <div className="section-sidebar">
          <div className="stealthy-scroll-container">
            <section className="popular">
            <ul className="nav">
              <li className="selected">
              <a href="/hot" className="label">
                <i className="icon hot"></i> Hot </a>
                <a className="button" href="/">
                  <i className="icon more"></i></a></li>
                  <li className=""><a href="/trending" className="label">
                    <i className="icon trending"></i> Trending </a></li>
                    <li className=""><a href="/fresh" className="label"><i className="icon fresh"></i> Fresh </a></li>
                    <li><a href="/" className="label"><i className="icon board"></i> Boards 🆕 </a></li>
                    <li><a href="/apps" target="_blank" className="label"><i className="icon phone"></i> Get 9GAG app </a></li></ul>
            </section>
          <section className=""><header>
            <h3>Popular</h3></header>
            <ul className="nav"><li className="">
              <a href="/india" className="label">
                <i className="thumbnail"><picture>
                  <source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283912.8748_aJuQuv_100x100wp.webp" type="image/webp"/>
                    <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283912.8748_aJuQuv_100x100.jpg" loading="lazy"/>
                      </picture></i> India 🇮🇳</a>
                      <a className="button" href="/"><i className="icon more"></i></a>
                      </li>
                      <li className="">
                        <a href="/funny" className="label">
                          <i className="thumbnail"><picture>
                            <source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp" type="image/webp"/>
                              <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg" loading="lazy"/>
                                </picture></i> Funny</a><a className="button" href="s"><i className="icon star"></i></a></li>
                                <li className=""><a href="/nsfw" className="label"><i className="thumbnail"><picture>
                          <source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297099.4728_VeSAvU_100x100wp.webp" type="image/webp"/>
                            <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297099.4728_VeSAvU_100x100.jpg" loading="lazy"/>
                              </picture></i> NSFW</a><a className="button" href="/"><i className="icon star"></i></a></li>
                              <li className=""><a href="/girl" className="label"><i className="thumbnail">
                                <picture>
                    <source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286922.3692_aWySaZ_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286922.3692_aWySaZ_100x100.jpg" loading="lazy"/></picture></i> Girl</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/wtf" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310702.1267_UgysAp_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310702.1267_UgysAp_100x100.jpg" loading="lazy"/></picture></i> WTF</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/anime-manga" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310356.2625_y8EVa2_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310356.2625_y8EVa2_100x100.jpg" loading="lazy"/></picture></i> Anime &amp; Manga</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/random" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1481541784.8502_e8ARAR_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1481541784.8502_e8ARAR_100x100.jpg" loading="lazy"/></picture></i> Random </a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/animals" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557391851.3248_Za4UdA_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557391851.3248_Za4UdA_100x100.jpg" loading="lazy"/></picture></i> Animals</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/animewaifu" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216667.6148_TuNebU_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216667.6148_TuNebU_100x100.jpg" loading="lazy"/></picture></i> Anime Waifu</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/awesome" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557217995.2799_bYQyJU_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557217995.2799_bYQyJU_100x100.jpg" loading="lazy"/></picture></i> Awesome</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/car" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557311278.4297_UNEHy6_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557311278.4297_UNEHy6_100x100.jpg" loading="lazy"/></picture></i> Car</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/comic-webtoon" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557399125.5971_HYGaTE_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557399125.5971_HYGaTE_100x100.jpg" loading="lazy"/></picture></i> Comic &amp; Webtoon</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/cosplay" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216678.2404_U2EHEM_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216678.2404_U2EHEM_100x100.jpg" loading="lazy"/></picture></i> Cosplay</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/cyberpunk2077" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1601435242.0864_EhY7Ym_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1601435242.0864_EhY7Ym_100x100.jpg" loading="lazy"/></picture></i> Cyberpunk 2077</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/gaming" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286928.6604_uTYgug_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286928.6604_uTYgug_100x100.jpg" loading="lazy"/></picture></i> Gaming</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/gif" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283958.4323_AXE2aJ_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283958.4323_AXE2aJ_100x100.jpg" loading="lazy"/></picture></i> GIF</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/girlcelebrity" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216688.9396_YduXUP_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216688.9396_YduXUP_100x100.jpg" loading="lazy"/></picture></i> Girl Celebrity</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/leagueoflegends" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291375.3948_Dy2yZu_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291375.3948_Dy2yZu_100x100.jpg" loading="lazy"/></picture></i> League of Legends</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/meme" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216707.0007_ESESyM_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216707.0007_ESESyM_100x100.jpg" loading="lazy"/></picture></i> Meme</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/politics" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286889.2504_mEVy2A_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286889.2504_mEVy2A_100x100.jpg" loading="lazy"/></picture></i> Politics </a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/relationship" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557281608.0144_yjEDu7_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557281608.0144_yjEDu7_100x100.jpg" loading="lazy"/></picture></i> Relationship</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/savage" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291282.8015_egYQAB_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291282.8015_egYQAB_100x100.jpg" loading="lazy"/></picture></i> Savage</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/video" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283964.0386_avUmy5_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557283964.0386_avUmy5_100x100.jpg" loading="lazy"/></picture></i> Video</a><a className="button" href="/"><i className="icon star"></i></a></li></ul></section>
          <section className=""><header><h3>Sections</h3></header><ul className="nav"><li className=""><a href="/among-us" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1602236386.2377_YVAWUr_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1602236386.2377_YVAWUr_100x100.jpg" loading="lazy"/></picture></i> Among Us</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/animewallpaper" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_100x100.jpg" loading="lazy"/></picture></i> Anime Wallpaper</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/apexlegends" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557130395.0362_Je7YJA_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557130395.0362_Je7YJA_100x100.jpg" loading="lazy"/></picture></i> Apex Legends</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/ask9gag" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297343.7755_SUPELy_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297343.7755_SUPELy_100x100.jpg" loading="lazy"/></picture></i> Ask 9GAG</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/coronavirus" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1584508226.1928_evY7UG_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1584508226.1928_evY7UG_100x100.jpg" loading="lazy"/></picture></i> Coronavirus </a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/countryballs" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310697.557_Ba4aSa_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557310697.557_Ba4aSa_100x100.jpg" loading="lazy"/></picture></i> Countryballs</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/home-living" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1571738757.4169_vevUNA_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1571738757.4169_vevUNA_100x100.jpg" loading="lazy"/></picture></i> Cozy &amp; Comfy</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/crappydesign" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286985.8981_4eqENa_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286985.8981_4eqENa_100x100.jpg" loading="lazy"/></picture></i> Crappy Design</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/drawing-diy-crafts" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286939.2639_Te3EBe_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286939.2639_Te3EBe_100x100.jpg" loading="lazy"/></picture></i> Drawing, DIY &amp; Crafts</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/rate-my-outfit" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557453498.4533_yvyBU6_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557453498.4533_yvyBU6_100x100.jpg" loading="lazy"/></picture></i> Fashion &amp; Beauty</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/food-drinks" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557295964.6843_uHyTu2_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557295964.6843_uHyTu2_100x100.jpg" loading="lazy"/></picture></i> Food &amp; Drinks</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/football" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557287081.4699_5A9aLe_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557287081.4699_5A9aLe_100x100.jpg" loading="lazy"/></picture></i> Football</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/fortnite" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291380.0454_yXALUZ_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291380.0454_yXALUZ_100x100.jpg" loading="lazy"/></picture></i> Fortnite</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/got" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216648.3213_E9Eba6_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216648.3213_E9Eba6_100x100.jpg" loading="lazy"/></picture></i> Game of Thrones</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/guy" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557295872.771_uTAnAD_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557295872.771_uTAnAD_100x100.jpg" loading="lazy"/></picture></i> Guy</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/history" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557296197.2188_XEhabA_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557296197.2188_XEhabA_100x100.jpg" loading="lazy"/></picture></i> History</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/horror" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286914.1262_U3EQav_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286914.1262_U3EQav_100x100.jpg" loading="lazy"/></picture></i> Horror</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/kpop" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216683.8874_hunY4u_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216683.8874_hunY4u_100x100.jpg" loading="lazy"/></picture></i> K-Pop</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/timely" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286757.4584_Du3Eba_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286757.4584_Du3Eba_100x100.jpg" loading="lazy"/></picture></i> Latest News</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/lego" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123612.5851_ENENAQ_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123612.5851_ENENAQ_100x100.jpg" loading="lazy"/></picture></i> LEGO</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/superhero" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216694.937_U7UHEb_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216694.937_U7UHEb_100x100.jpg" loading="lazy"/></picture></i> Marvel &amp; DC</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/movie-tv" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286907.1035_hE2uHE_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286907.1035_hE2uHE_100x100.jpg" loading="lazy"/></picture></i> Movie &amp; TV</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/music" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286900.9909_E8EGyp_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286900.9909_E8EGyp_100x100.jpg" loading="lazy"/></picture></i> Music</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/basketball" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286654.1198_yNyna7_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286654.1198_yNyna7_100x100.jpg" loading="lazy"/></picture></i> NBA</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/overwatch" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123617.4712_DEbYBA_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123617.4712_DEbYBA_100x100.jpg" loading="lazy"/></picture></i> Overwatch</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/pcmr" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557311439.7179_8UsUhu_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557311439.7179_8UsUhu_100x100.jpg" loading="lazy"/></picture></i> PC Master Race</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/pokemon" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123631.4709_XUSEmY_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123631.4709_XUSEmY_100x100.jpg" loading="lazy"/></picture></i> Pokémon</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/pubg" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557130506.0765_aXuNa4_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557130506.0765_aXuNa4_100x100.jpg" loading="lazy"/></picture></i> PUBG</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/satisfying" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291577.7623_4Y5A3U_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557291577.7623_4Y5A3U_100x100.jpg" loading="lazy"/></picture></i> Satisfying</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/science-tech" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286779.394_WYru9a_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286779.394_WYru9a_100x100.jpg" loading="lazy"/></picture></i> Science &amp; Tech</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/sport" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286774.0983_eGARyH_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286774.0983_eGARyH_100x100.jpg" loading="lazy"/></picture></i> Sport </a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/starwars" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123636.2678_UPYNuT_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123636.2678_UPYNuT_100x100.jpg" loading="lazy"/></picture></i> Star Wars</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/school" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557290674.9492_ARAda3_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557290674.9492_ARAda3_100x100.jpg" loading="lazy"/></picture></i> Teens Can Relate</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/travel-photography" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557398058.2002_EmASyv_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557398058.2002_EmASyv_100x100.jpg" loading="lazy"/></picture></i> Travel &amp; Photography</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/wallpaper" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557397422.1946_Evebyr_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557397422.1946_Evebyr_100x100.jpg" loading="lazy"/></picture></i> Wallpaper</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/warhammer" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123640.8958_YWaGUb_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557123640.8958_YWaGUb_100x100.jpg" loading="lazy"/></picture></i> Warhammer</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/wholesome" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1571808085.3621_gyMeNu_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1571808085.3621_gyMeNu_100x100.jpg" loading="lazy"/></picture></i> Wholesome</a><a className="button" href="/"><i className="icon star"></i></a></li><li className=""><a href="/darkhumor" className="label"><i className="thumbnail"><picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557453152.4514_U2asE8_100x100wp.webp" type="image/webp"/><img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557453152.4514_U2asE8_100x100.jpg" loading="lazy"/></picture></i> Dark Humor</a><a className="button" href="/"><i className="icon star"></i></a></li></ul></section>
          <section className="footer"><p className="static"><a target="_blank" href="/advertise">Advertise</a><a target="_blank" href="/rules">Rules</a><a target="_blank" href="/tips">Tips</a><a target="_blank" href="/faq">FAQ</a><a target="_blank" href="/tos">Terms</a><a target="_blank" href="/privacy">Privacy</a><a target="_blank" href="/copyright">Copyright</a><a target="_blank" href="/jobs">Jobs</a><a target="_blank" href="/contact">Contact</a><a target="_blank" href="/feedback">Feedback</a><a target="_blank" href="/report-bad-ads">Report Bad Ads</a></p><p className="static">9GAG © 2020</p></section>

          </div>
        </div>

        <div className="page"><div className="topBannerAd-container">
          <div className="topBannerAd" id="jsid-ad-container-banner_top" data-collapseonempty="1" style={{transition: "height 0.3s ease-out 0s"}}>
            <div id="google_ads_iframe_/16921351/9GAG/Unit8_0__container__" style={{border: "0pt none", width: "970px", height: "250px"}}></div></div></div>
            <div className="main-wrap"><div className="featured-tag"><a href="https://9gag.com/tag/johnny-depp?ref=featured-tag">Johnny Depp</a>
            <a href="https://9gag.com/tag/trump?ref=featured-tag">Trump</a><a href="https://9gag.com/tag/biden?ref=featured-tag">Biden</a>
            <a href="https://9gag.com/tag/us-election?ref=featured-tag">US Election</a><a href="https://9gag.com/tag/cyberpunk-2077?ref=featured-tag">Cyberpunk 2077</a>
            <a href="https://9gag.com/tag/among-us?ref=featured-tag">Among Us</a>
            <a href="https://9gag.com/tag/scarlett-johansson?ref=featured-tag">Scarlett Johansson</a>
            <a href="https://9gag.com/tag/leonardo-dicaprio?ref=featured-tag">Leonardo DiCaprio</a></div>
            <section id="list-view-2"><div className="list-stream" id="stream-0" style={{"minHeight": "0px"}}>
              <div>
              <article id="jsid-post-aGdQZ97"><header><div className="post-section"><a className="icon" target="_blank" href="https://9gag.com/funny?ref=post-section">
                <picture><source srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp" type="image/webp"/>
                <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg" loading="lazy"/></picture></a>
                <p className="message"><a className="section" target="_blank" href="https://9gag.com/funny?ref=post-section">Funny</a> · 1h</p></div>
  <a data-evt="PostList,TapPost,Hot,,PostTitle" data-entry-id="aGdQZ97" data-position="1" className="badge-evt badge-track" track="post,v,,,d,aGdQZ97,l" href="/gag/aGdQZ97" target="_blank"><h1>Can we start a petition to make this movie</h1></a></header>
  <div className="post-container">
  <div>
    <div className="post-container"><a data-evt="PostList,TapPost,Hot,,PostImage" data-entry-id="aGdQZ97"
        data-position="1" href="/gag/aGdQZ97" className="badge-evt badge-track" target="_blank"
        style={{"minHeight": "414.13px"}}>
        <picture>
          <source srcSet="https://img-9gag-fun.9cache.com/photo/aGdQZ97_460swp.webp" type="image/webp" /><img
            src="https://img-9gag-fun.9cache.com/photo/aGdQZ97_460s.jpg"
            alt="Can we start a petition to make this movie" loading="lazy" style={{"minHeight": "414.13px"}} /></picture>
      </a></div>
  </div>
  <div className="post-text-container"></div>
</div>
<p className="post-meta"><a data-evt="PostList,TapPost,Hot,,Point" data-entry-id="aGdQZ97" data-position="1"
    className="point badge-evt" href="/gag/aGdQZ97" target="_blank">860 points</a> · <a
    data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="aGdQZ97" data-position="1"
    className="comment badge-evt" href="/gag/aGdQZ97#comment" target="_blank">35 comments</a></p>
<div className="post-afterbar-a in-list-view">
  <ul className="btn-vote left">
    <li><a className="up" href="/"><span>UP</span></a></li>
    <li><a className="down" href="/"><span>DOWN</span></a></li>
  </ul>
  <ul className="btn-vote left">
    <li><a data-evt="PostList,TapPost,Hot,,Comment" data-entry-id="aGdQZ97" data-position="1"
        className="comment badge-evt" target="_blank" href="/gag/aGdQZ97#comment"> Comment </a></li>
  </ul>
  <div>
    <ul className="btn-vote left"><a className="more" href="/"> More </a></ul>
  </div>
  <div className="share right">
    <ul>
      <li><a className="badge-evt badge-track btn-share facebook" href="/" data-track="social,fb.s,,,d,aGdQZ97,l)"
          data-evt="PostList,ShareSocial,Hot,,FacebookButton" data-entry-id="aGdQZ97" data-position="1"> Facebook </a>
      </li>
      <li><a className="badge-evt badge-track btn-share pinterest" href="/" data-track="social,pn.s,,,d,aGdQZ97,l"
          data-evt="PostList,ShareSocial,Hot,,PinterestButton" data-entry-id="aGdQZ97" data-position="1"> Pinterest </a>
      </li>
    </ul>
  </div>
</div>
<div className="clearfix"></div>
</article>
<article id="jsid-post-aMxLALP">
  <header>
    <div className="post-section"><a className="icon" target="_blank" href="https://9gag.com/nsfw?ref=post-section">
        <picture>
          <source
            srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297099.4728_VeSAvU_100x100wp.webp"
            type="image/webp" /><img
            src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557297099.4728_VeSAvU_100x100.jpg"
            loading="lazy" /></picture>
      </a>
      <p className="message"><a className="section" target="_blank"
          href="https://9gag.com/nsfw?ref=post-section">NSFW</a> · 6h</p>
    </div><a data-evt="PostList,TapPost,Hot,,PostTitle" data-entry-id="aMxLALP" data-position="2"
      className="badge-evt badge-track" track="post,v,,,d,aMxLALP,l" href="/gag/aMxLALP" target="_blank">
      <h1>ABC For Adults</h1>
    </a>
  </header>
  <div className="post-container">
    <div><a href="/">
        <div className="nsfw-post">
          <h3>Sensitive Content</h3>
          <p>Click to view this post.</p>
        </div>
      </a></div>
    <div className="post-text-container"></div>
  </div>
  <p className="post-meta"><a data-evt="PostList,TapPost,Hot,,Point" data-entry-id="aMxLALP" data-position="2"
      className="point badge-evt" href="/gag/aMxLALP" target="_blank">18,603 points</a> · <a
      data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="aMxLALP" data-position="2"
      className="comment badge-evt" href="/gag/aMxLALP#comment" target="_blank">1,200 comments</a></p>
  <div className="post-afterbar-a in-list-view">
    <ul className="btn-vote left">
      <li><a className="up" href="/"><span>UP</span></a></li>
      <li><a className="down" href="/"><span>DOWN</span></a></li>
    </ul>
    <ul className="btn-vote left">
      <li><a data-evt="PostList,TapPost,Hot,,Comment" data-entry-id="aMxLALP" data-position="2"
          className="comment badge-evt" target="_blank" href="/gag/aMxLALP#comment"> Comment </a></li>
    </ul>
    <div>
      <ul className="btn-vote left"><a className="more" href="/"> More </a></ul>
    </div>
    <div className="share right">
      <ul>
        <li><a className="badge-evt badge-track btn-share facebook" href="/" data-track="social,fb.s,,,d,aMxLALP,l)"
            data-evt="PostList,ShareSocial,Hot,,FacebookButton" data-entry-id="aMxLALP" data-position="2"> Facebook </a>
        </li>
        <li><a className="badge-evt badge-track btn-share pinterest" href="/" data-track="social,pn.s,,,d,aMxLALP,l"
            data-evt="PostList,ShareSocial,Hot,,PinterestButton" data-entry-id="aMxLALP" data-position="2"> Pinterest
          </a></li>
      </ul>
    </div>
  </div>
  <div className="clearfix"></div>
</article>
<article>
  <div className="post-container">
    <div>
      <div style={{"width": "500px",height: "10px", "zIndex": "1", position: "relative", overflow: "hidden"}}>
        <div id="vi-1605615985407" className="vi-stories-top-div viUnit2">
          <div id="vi-stories-main-placeholder" className="displayNone"></div>
          <div id="vi-stories-main-container"
            className="vi-stories-main-container vi-stories-zIndex-base vi-stories-width-max-500" style={{"width":" 0px"}}>
            <div id="vi-stories-player-container" className="vi-stories-player-container vi-stories-zIndex-base">
              <div id="vi-stories-ad-container"></div>
              <div id="vi-stories-gui-container"></div>
            </div>
            <div id="vi-stories-close-button"
              className="pointer displayNone vi-stories-position top-right outside-vi-unit"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="clearfix"></div>
</article>
</div>
</div>
<div className="list-stream" id="stream-1" style={{"minHeight": "0px"}}>
  <div>
    <article id="jsid-post-an4ojrq">
      <header>
        <div className="post-section"><a className="icon" target="_blank"
            href="https://9gag.com/funny?ref=post-section">
            <picture>
              <source
                srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp"
                type="image/webp" /><img
                src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg"
                loading="lazy" /></picture>
          </a>
          <p className="message"><a className="section" target="_blank"
              href="https://9gag.com/funny?ref=post-section">Funny</a> · 7h</p>
        </div><a data-evt="PostList,TapPost,Hot,,PostTitle" data-entry-id="an4ojrq" data-position="3"
          className="badge-evt badge-track" track="post,v,,,d,an4ojrq,l" href="/gag/an4ojrq" target="_blank">
          <h1>My new room after my GF dumped me, my Mom died of COVID, and I was laid off from my job. Stay strong, stay
            vigilant, and stay drunk mates :)</h1>
        </a>
      </header>
      <div className="post-container">
        <div>
          <div className="post-container"><a data-evt="PostList,TapPost,Hot,,PostImage" data-entry-id="an4ojrq"
              data-position="3" href="/gag/an4ojrq" className="badge-evt badge-track" target="_blank"
              style={{"minHeight": "375px"}}>
              <picture>
                <source srcSet="https://img-9gag-fun.9cache.com/photo/an4ojrq_460swp.webp" type="image/webp" /><img
                  src="https://img-9gag-fun.9cache.com/photo/an4ojrq_460s.jpg"
                  alt="My new room after my GF dumped me, my Mom died of COVID, and I was laid off from my job. Stay strong, stay vigilant, and stay drunk mates :)"
                  loading="lazy" style={{"minHeight": "375px"}}/></picture>
            </a></div>
        </div>
        <div className="post-text-container"></div>
      </div>
      <p className="post-meta"><a data-evt="PostList,TapPost,Hot,,Point" data-entry-id="an4ojrq" data-position="3"
          className="point badge-evt" href="/gag/an4ojrq" target="_blank">12,244 points</a> · <a
          data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="an4ojrq" data-position="3"
          className="comment badge-evt" href="/gag/an4ojrq#comment" target="_blank">1,024 comments</a></p>
      <div className="post-afterbar-a in-list-view">
        <ul className="btn-vote left">
          <li><a className="up" href="/"><span>UP</span></a></li>
          <li><a className="down" href="/"><span>DOWN</span></a></li>
        </ul>
        <ul className="btn-vote left">
          <li><a data-evt="PostList,TapPost,Hot,,Comment" data-entry-id="an4ojrq" data-position="3"
              className="comment badge-evt" target="_blank" href="/gag/an4ojrq#comment"> Comment </a></li>
        </ul>
        <div>
          <ul className="btn-vote left"><a className="more" href="/"> More </a></ul>
        </div>
        <div className="share right">
          <ul>
            <li><a className="badge-evt badge-track btn-share facebook" href="/" data-track="social,fb.s,,,d,an4ojrq,l)"
                data-evt="PostList,ShareSocial,Hot,,FacebookButton" data-entry-id="an4ojrq" data-position="3"> Facebook
              </a></li>
            <li><a className="badge-evt badge-track btn-share pinterest" href="/" data-track="social,pn.s,,,d,an4ojrq,l"
                data-evt="PostList,ShareSocial,Hot,,PinterestButton" data-entry-id="an4ojrq" data-position="3">
                Pinterest </a></li>
          </ul>
        </div>
      </div>
      <div className="clearfix"></div>
    </article>
    <article id="jsid-post-aBmexX2">
      <header>
        <div className="post-section"><a className="icon" target="_blank"
            href="https://9gag.com/funny?ref=post-section">
            <picture>
              <source
                srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp"
                type="image/webp" /><img
                src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg"
                loading="lazy" /></picture>
          </a>
          <p className="message"><a className="section" target="_blank"
              href="https://9gag.com/funny?ref=post-section">Funny</a> · 3h</p>
        </div><a data-evt="PostList,TapPost,Hot,,PostTitle" data-entry-id="aBmexX2" data-position="4"
          className="badge-evt badge-track" track="post,v,,,d,aBmexX2,l" href="/gag/aBmexX2" target="_blank">
          <h1>Because the original uploader used his Nokia while laying on the floor recording Netflix</h1>
        </a>
      </header>
      <div className="post-container">
        <div><a href="/gag/aBmexX2" data-track="post,p,,,d,aBmexX2,p" className="badge-track" target="_blank"
            style={{"minHeight": "280.435px"}}>
            <div className="post-view video-post"><video preload="auto"
                poster="https://img-9gag-fun.9cache.com/photo/aBmexX2_460swp.webp" loop="" width="500"
                style={{"minHeight": "280.435px", width: "500px"}}>
                <source src="https://img-9gag-fun.9cache.com/photo/aBmexX2_460svvp9.webm"
                  type="video/webm; codecs=&quot;vp9, opus&quot;"/>
                <source src="https://img-9gag-fun.9cache.com/photo/aBmexX2_460sv.mp4" type="video/mp4" /></video>
              <div className="sound-toggle off"></div>
              <div className="presenting"><span className="play">Play</span></div>
            </div>
          </a></div>
        <div className="post-text-container"></div>
      </div>
      <p className="post-meta"><a data-evt="PostList,TapPost,Hot,,Point" data-entry-id="aBmexX2" data-position="4"
          className="point badge-evt" href="/gag/aBmexX2" target="_blank">5,063 points</a> · <a
          data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="aBmexX2" data-position="4"
          className="comment badge-evt" href="/gag/aBmexX2#comment" target="_blank">233 comments</a></p>
      <div className="post-afterbar-a in-list-view">
        <ul className="btn-vote left">
          <li><a className="up" href="/"><span>UP</span></a></li>
          <li><a className="down" href="/"><span>DOWN</span></a></li>
        </ul>
        <ul className="btn-vote left">
          <li><a data-evt="PostList,TapPost,Hot,,Comment" data-entry-id="aBmexX2" data-position="4"
              className="comment badge-evt" target="_blank" href="/gag/aBmexX2#comment"> Comment </a></li>
        </ul>
        <div>
          <ul className="btn-vote left"><a className="more" href="/"> More </a></ul>
        </div>
        <div className="share right">
          <ul>
            <li><a className="badge-evt badge-track btn-share facebook" href="/" data-track="social,fb.s,,,d,aBmexX2,l)"
                data-evt="PostList,ShareSocial,Hot,,FacebookButton" data-entry-id="aBmexX2" data-position="4"> Facebook
              </a></li>
            <li><a className="badge-evt badge-track btn-share pinterest" href="/" data-track="social,pn.s,,,d,aBmexX2,l"
                data-evt="PostList,ShareSocial,Hot,,PinterestButton" data-entry-id="aBmexX2" data-position="4">
                Pinterest </a></li>
          </ul>
        </div>
      </div>
      <div className="clearfix"></div>
    </article>
    <article id="jsid-post-amvKwZj">
      <header>
        <div className="post-section"><a className="icon" target="_blank"
            href="https://9gag.com/politics?ref=post-section">
            <picture>
              <source
                srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286889.2504_mEVy2A_100x100wp.webp"
                type="image/webp" /><img
                src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557286889.2504_mEVy2A_100x100.jpg"
                loading="lazy" /></picture>
          </a>
          <p className="message"><a className="section" target="_blank"
              href="https://9gag.com/politics?ref=post-section">Politics </a></p>
        </div><a data-evt="PostList,TapPost,Hot,,PostTitle" data-entry-id="amvKwZj" data-position="5"
          className="badge-evt badge-track" track="post,v,,,d,amvKwZj,l" href="/gag/amvKwZj" target="_blank">
          <h1>US Election 2020</h1>
        </a>
      </header>
      <div className="post-container">
        <div>
          <div className="post-container with-button"><a data-evt="PostList,TapPost,Hot,,ArticlePostImage"
              data-entry-id="amvKwZj" data-position="5" href="/gag/amvKwZj" className="badge-evt badge-track"
              target="_blank" style={{"minHeight": "280.714px"}}>
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/55270598_1603425376.278_a9UBan_700bwp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/55270598_1603425376.278_a9UBan_700b.jpg"
                  alt="US Election 2020" loading="lazy" style={{"minHeight": "280.714px"}}/></picture>
            </a><a data-evt="PostList,TapPost,Hot,,ArticlePostViewFullPost" data-entry-id="amvKwZj" data-position="5"
              className="badge-evt" href="/gag/amvKwZj" target="_blank">
              <div className="post-read-more">View Full Post</div>
            </a></div>
        </div>
        <div className="post-text-container">
          <p>Discussion thread of the US Presidential Election 2020</p>
        </div>
      </div>
      <p className="post-meta"><a data-evt="PostList,TapPost,Hot,,Point" data-entry-id="amvKwZj" data-position="5"
          className="point badge-evt" href="/gag/amvKwZj" target="_blank">8,131 points</a> · <a
          data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="amvKwZj" data-position="5"
          className="comment badge-evt" href="/gag/amvKwZj#comment" target="_blank">71,173 comments</a></p>
      <div className="post-afterbar-a in-list-view">
        <ul className="btn-vote left">
          <li><a className="up" href="/"><span>UP</span></a></li>
          <li><a className="down" href="/"><span>DOWN</span></a></li>
        </ul>
        <ul className="btn-vote left">
          <li><a data-evt="PostList,TapPost,Hot,,Comment" data-entry-id="amvKwZj" data-position="5"
              className="comment badge-evt" target="_blank" href="/gag/amvKwZj#comment"> Comment </a></li>
        </ul>
        <div>
          <ul className="btn-vote left"><a className="more" href="/"> More </a></ul>
        </div>
        <div className="share right">
          <ul>
            <li><a className="badge-evt badge-track btn-share facebook" href="/" data-track="social,fb.s,,,d,amvKwZj,l)"
                data-evt="PostList,ShareSocial,Hot,,FacebookButton" data-entry-id="amvKwZj" data-position="5"> Facebook
              </a></li>
            <li><a className="badge-evt badge-track btn-share pinterest" href="/" data-track="social,pn.s,,,d,amvKwZj,l"
                data-evt="PostList,ShareSocial,Hot,,PinterestButton" data-entry-id="amvKwZj" data-position="5">
                Pinterest </a></li>
          </ul>
        </div>
      </div>
      <div className="clearfix"></div>
    </article>
  </div>
</div>
<div className="loading">
  <div style={{"height": "1px"}}></div><a className="btn spin">
    <div className="simple-spinner"></div>
  </a>
</div>
</section>
</div>
<section id="sidebar" style={{"height": "6844px"}}>
  <div id="sidebar-content">
    <section className="block-ad">
      <div id="jsid-ad-container-sidebar_top" className="img-container"></div>
    </section>
    <section className="block-ad">
      <div id="jsid-ad-container-sidebar_top_B" className="img-container"></div>
    </section><a href="/apps" className="get-the-app-banner" target="_blank"></a>
    <section className="block-feature-cover">
      <ul>
        <li><a href="https://9gag.com/funny/aeDqnG5?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1604330814.3699_UVarAB_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1604330814.3699_UVarAB_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>What is even going on</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/awesome/aK7Zbm3?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1605110658.5089_e2YGe2_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1605110658.5089_e2YGe2_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>Legendary ballerina with Alzheimers listen's to Swan Lake and it all comes rushing back</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/wtf/adVW8zN?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1603794253.1339_LY5ebe_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1603794253.1339_LY5ebe_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>Dominatrix Spotted Walking Man On Leash In Supermarket</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/funny/aLwovWW?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1605110776.4089_AjaHap_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1605110776.4089_AjaHap_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>Bye bye Trump</h3>
            </div>
          </a></li>
      </ul>
    </section>
    <section className="block-ad">
      <div id="jsid-ad-container-sidebar_mid" className="img-container"></div>
    </section>
    <section className="block-ad">
      <div id="jsid-ad-container-sidebar_mid_B" className="img-container"></div>
    </section>
    <section className="block-feature-cover">
      <ul>
        <li><a href="https://9gag.com/movie-tv/aQd5eKK?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1605195594.0632_U7Aha6_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1605195594.0632_U7Aha6_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>People Are Supporting Johnny Depp With Memes After Warner Forces Him To Resign</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/wtf/aBmMEnA?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1604330604.861_ApetAb_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1604330604.861_ApetAb_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>People Start Panic Buying Again As UK Face Second National Lockdown</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/awesome/aEPj4Dp?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1603962886.4667_evynY5_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1603962886.4667_evynY5_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>Xbox Series X Fridge Meme Becomes An Actual Giveaway</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/science-tech/adVMnDZ?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1604309650.8673_u7uXYZ_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1604309650.8673_u7uXYZ_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>Disney’s New Skinless Robot Can Blink And "Breathe" Like A Human</h3>
            </div>
          </a></li>
        <li><a href="https://9gag.com/gaming/avzwWDM?ref=fsidebar" target="_blank">
            <div className="img-container">
              <picture>
                <source
                  srcSet="https://miscmedia-9gag-fun.9cache.com/images/featured/1605195678.0773_uWuzev_300x158wp.webp"
                  type="image/webp" /><img
                  src="https://miscmedia-9gag-fun.9cache.com/images/featured/1605195678.0773_uWuzev_300x158.jpg"
                  loading="lazy" /></picture>
            </div>
            <div className="info-container">
              <h3>You Can Now Stop A Pandemic With 'The Cure' Mode In 'Plague Inc.'</h3>
            </div>
          </a></li>
      </ul>
    </section>
    <div>
      <section className="block-ad">
        <div id="jsid-ad-container-sidebar_bottom_B" className="img-container"></div>
      </section>
      <section className="block-ad">
        <div id="jsid-ad-container-sidebar_bottom" className="img-container" style={{"height": "600px"}}></div>
      </section>
      <section className="get-the-app">
        <h2 className="sidebar-title">Get the App</h2>
        <ul>
          <li><a className="app-store" href="/ios" target="_blank"> Download on App Store </a></li>
          <li><a className="google-play" href="/android" target="_blank"> Get it on Google Play </a></li>
        </ul>
      </section>
      <section className="block-social-love">
        <h2 className="sidebar-title">Connect with 9GAG!</h2>
        <ul className="social-love">
         
        </ul>
      </section>
    </div>
  </div>
</section>
<div className="clearfix"></div>
</div>
</div>
    </div>
  );
  }
}

export default App;
