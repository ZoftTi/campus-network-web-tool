// ==UserScript==
// @name         简易校园网登录自动化脚本
// @namespace    http://ti.zoft.work/
// @version      1.0
// @description  用于美化校园网 Web 登录页面, 自动登录等!
// @author       ZoftTi
// @match        http://10.69.69.1/portal.do*
// @match        http://10.69.69.1/portal/usertemp_computer/gxjxzyxy-pc-charge/logout.html*
// @match        http://10.69.69.1/portalLogout.do*
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  // 美化 UI 界面
  let resetUi = true
  // 打开网页自动登录
  let autoSubmitLogin = false
  // 校园网账号
  let username = ''
  // 校园网密码
  let password = ''

  let body = document.querySelector("body")
  let container = document.querySelector(".container")
  let containerRight = document.querySelector(".container-right")
  let containerLogin = document.querySelector(".container-login")
  let containerLoginTitleWrap = document.querySelector(".container-login-title")
  let containerLoginSpan = document.querySelectorAll(".container-login .form-filed i")
  let containerLoginInputWrap = document.querySelectorAll(".container-login .form-filed")
  let containerLoginInput = document.querySelectorAll(".container-login .form-filed input")
  let containerLoginSubmit = document.querySelector("#loginsubmit") ? document.querySelector("#loginsubmit") : document.querySelector("#logoutsubmit")

  if (document.querySelector(".mask")) document.querySelector(".mask").remove()
  if (document.querySelector(".modal")) document.querySelector(".modal").remove()
  if (document.querySelector(".buttom")) document.querySelector(".buttom").remove()

  if (document.querySelector(".charge_modal")) document.querySelector(".charge_modal").remove()
  if (document.querySelector(".charge_mask")) document.querySelector(".charge_mask").remove()
  if (document.querySelector("._confirm_model")) document.querySelector("._confirm_model").remove()
  if (document.querySelector(".serivce_model")) document.querySelector(".serivce_model").remove()
  if (document.querySelector(".loading")) document.querySelector(".loading").remove()
  if (document.querySelector(".loading-mask")) document.querySelector(".loading-mask").remove()
  if (document.querySelector(".modal2")) document.querySelector(".modal2").remove()

  if (resetUi) {

    body.style.background = "#ebecf2"
    body.style.boxSizing = "border-box"

    if (document.querySelector(".container-left")) document.querySelector(".container-left").remove()
    if (document.querySelector(".container-top")) document.querySelector(".container-top").remove()
    if (document.querySelector(".container-gotohome")) document.querySelector(".container-gotohome").remove()
    if (document.querySelector(".container-gotohome")) document.querySelector(".container-gotohome").remove()
    if (document.querySelector(".announcement")) document.querySelector(".announcement").remove()
  
    // logout 样式
    if (document.querySelectorAll(".container-login div p")[1]) {
      document.querySelectorAll('.container-login div p')[0].parentNode.setAttribute('style', 'padding: 40px 0px 0px 0px;')
      document.querySelectorAll('.container-login div p').forEach((item) => {
        item.setAttribute('style', 'color: #000; font-size: 16px')
      })
    }

    // links 样式 
    if (document.querySelector(".links")) document.querySelector(".links").setAttribute("style", "display:none")

    container.setAttribute("style", "display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh; padding: 0; text-align: center")
    containerRight.setAttribute("style", "margin: 0; padding: 0; width: auto")
    containerLogin.setAttribute("style","width: 370px; height: 420px; position: relative; background: #ffffff; box-sizing: border-box; color: #000000; border-radius: 25px")

    // 消息提示框样式
    if (document.querySelector(".alert_model")) {
      document.querySelector(".alert_mask").remove()
      document.querySelector(".alert_msg").setAttribute("style","color: white; cursor: pointer; background-color: #7367f0; border-radius: 10px; box-shadow: 0 8px 25px -8px #7367f0; transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;")
    }

    // 登录栏标题样式
    let title = document.createElement("h3")
    title.innerHTML = "上网认证"
    title.style.setProperty("padding", "10px 10px 10px 5px")
    title.style.setProperty("margin", "initial")
    title.style.setProperty("color", "#000000")

    containerLoginTitleWrap.innerHTML = ""
    containerLoginTitleWrap.setAttribute("style","display: flex; align-items: center; justify-content: space-between; height: 46px; font-size: initial; margin: initial; padding: initial; border: initial")
    containerLoginTitleWrap.appendChild(title)

    containerLoginInputWrap.forEach((item) => {item.setAttribute("style","width: initial; height: initial; margin: initial; padding: initial; background: initial")})

    containerLoginInput.forEach((item, index) => {
      let inputSpan = document.createElement("span")
      inputSpan.setAttribute("style","display: block; font-size: 0.8rem; padding: 10px 10px 15px 10px; text-align: left")
      inputSpan.innerHTML = index ? "认证密码" : "认证账号"
      item.parentNode.insertBefore(inputSpan, item)
      item.setAttribute("style","box-sizing: border-box; width: 100%; height: 50px; margin: 0px; padding: 10px 20px; border-radius: 10px; margin-bottom: 10px; font-size: 14px; outline: none; border: none; background-color: #f5f6f8; vertical-align: middle;")
    })
    containerLoginSpan.forEach((item) => item.remove())
    containerLoginSubmit.parentNode.setAttribute("style","width: calc(100% - 60px); margin: initial; position: absolute; bottom: 30px")
    containerLoginSubmit.setAttribute("style","box-sizing: border-box; margin: 60px 0 0 0; color: white; cursor: pointer; width: 100%; height: 50px; background-color: #7367f0; box-shadow: none; border-radius: 10px; transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;")

    containerLoginSubmit.onmouseover = function () {containerLoginSubmit.style.boxShadow = "0 8px 25px -8px #7367f0"}
    containerLoginSubmit.onmouseout = function () {containerLoginSubmit.style.boxShadow = "none"}
  }

  if (window.location.href.indexOf("portal.do") != -1) {

    if (document.querySelector("#read")) document.querySelector("#read").checked = true
    if (document.querySelector("#userid")) document.querySelector("#userid").value = username
    if (document.querySelector("#passwd")) document.querySelector("#passwd").value = password

    let loginInput = document.querySelector("#loginsubmit")

    loginInput.style.fontSize = "14px"
    loginInput.style.letterSpacing = "normal"

    if (autoSubmitLogin) {
      setTimeout(() => {
        loginInput.innerHTML = "正在登陆..."
        setTimeout(() => {
          loginInput.innerHTML = "登录完毕..."
          loginInput.click()
        }, 200);
      }, 200);
    }
  }

  // Your code here...
})()
