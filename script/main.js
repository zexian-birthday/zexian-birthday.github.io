// 标记按钮是否可用
let flag = false;
let countdownElement = document.getElementById('countdown');

// Import the data to customize and insert them into page
const fetchData = () => {
	// 调用函数，传入未来日期字符串，格式："YYYY-MM-DD"
	// countdown("2024-10-16 00:00:00",flag);
	countdown("2024-10-10 12:30:00", flag);
	fetch("customize.json")
		.then(data => data.json())
		.then(data => {
			console.log("data", data)
			dataArr = Object.keys(data)
			dataArr.map(customData => {
				if (data[customData] !== "") {
					if (customData === "imagePath") {
						document
							.querySelector(`[data-node-name*="${customData}"]`)
							.setAttribute("src", data[customData])
					} else {
						document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[
							customData]
					}
				}

				// Check if the iteration is over
				// Run amimation if so
				if (dataArr.length === dataArr.indexOf(customData) + 1) {
					document.querySelector("#startButton").addEventListener("click", () => {
						// 当点击按钮时，按钮处于可点击状态，程序向下运行
						if (flag == true) {
							document.querySelector(".startSign").style.display = "none"
							animationTimeline()
						} else {
							// 否则弹窗显示按钮不可用
							alert("不在活动时间")
						}
					})

					// animationTimeline()
				}
			})
		})
}

let audio = null

// 在文档加载时预加载音频
document.addEventListener("DOMContentLoaded", () => {
	// audio = new Audio("music/Count_On_Me.mp3")
	audio = new Audio(
		"music/Count_On_Me.mp3"
		);
	audio.preload = "auto"
})

const playPauseButton = document.getElementById('playPauseButton')
let isPlaying = false // 初始状态为未播放

playPauseButton.addEventListener('click', () => {
	isPlaying = !isPlaying // 切换播放状态

	if (isPlaying) {
		// 如果当前是播放状态，则开始播放音频并更新按钮样式
		audio.play()
		playPauseButton.classList.add('playing')
	} else {
		// 如果当前是暂停状态，则暂停音频并更新按钮样式
		audio.pause()
		playPauseButton.classList.remove('playing')
	}
})

// Animation Timeline
const animationTimeline = () => {
	// Spit chars that needs to be animated individually
	const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
	const hbd = document.getElementsByClassName("wish-hbd")[0]

	textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`

	hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`

	const ideaTextTrans = {
		opacity: 0,
		y: -20,
		rotationX: 5,
		skewX: "15deg"
	}

	const ideaTextTransLeave = {
		opacity: 0,
		y: 20,
		rotationY: 5,
		skewX: "-15deg"
	}

	const tl = new TimelineMax()

	tl
		.to(".container", 0.1, {
			visibility: "visible"
		})
		.from(".one", 0.7, {
			opacity: 0,
			y: 10
		})
		.from(".two", 0.4, {
			opacity: 0,
			y: 10
		})
		.to(
			".one",
			0.7, {
				opacity: 0,
				y: 10
			},
			"+=2.5"
		)
		.to(
			".two",
			0.7, {
				opacity: 0,
				y: 10
			},
			"-=1"
		)
		.from(".three", 0.7, {
			opacity: 0,
			y: 10
			// scale: 0.7
		})
		.to(
			".three",
			0.7, {
				opacity: 0,
				y: 10
			},
			"+=2"
		)
		.from(".four", 0.7, {
			scale: 0.2,
			opacity: 0
		})
		.from(".fake-btn", 0.3, {
			scale: 0.2,
			opacity: 0
		})
		.staggerTo(
			".hbd-chatbox span",
			0.5, {
				visibility: "visible"
			},
			0.05
		)
		.to(".fake-btn", 0.1, {
			backgroundColor: "#8FE3B6"
		})
		.to(
			".four",
			0.5, {
				scale: 0.2,
				opacity: 0,
				y: -150
			},
			"+=0.7"
		)
		.from(".idea-1", 0.7, ideaTextTrans)
		.to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
		.from(".idea-2", 0.7, ideaTextTrans)
		.to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
		.from(".idea-3", 0.7, ideaTextTrans)
		.to(".idea-3 strong", 0.5, {
			scale: 1.2,
			x: 10,
			backgroundColor: "rgb(21, 161, 237)",
			color: "#fff"
		})
		.to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
		.from(".idea-4", 0.7, ideaTextTrans)
		.to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
		.from(
			".idea-5",
			0.7, {
				rotationX: 15,
				rotationZ: -10,
				skewY: "-5deg",
				y: 50,
				z: 10,
				opacity: 0
			},
			"+=0.5"
		)
		.to(
			".idea-5 .smiley",
			0.7, {
				rotation: 90,
				x: 8
			},
			"+=0.4"
		)
		.to(
			".idea-5",
			0.7, {
				scale: 0.2,
				opacity: 0
			},
			"+=2"
		)
		.staggerFrom(
			".idea-6 span",
			0.8, {
				scale: 3,
				opacity: 0,
				rotation: 15,
				ease: Expo.easeOut
			},
			0.2
		)
		.staggerTo(
			".idea-6 span",
			0.8, {
				scale: 3,
				opacity: 0,
				rotation: -15,
				ease: Expo.easeOut
			},
			0.2,
			"+=1"
		)
		.staggerFromTo(
			".baloons img",
			2.5, {
				opacity: 0.9,
				y: 1400
			}, {
				opacity: 1,
				y: -1000
			},
			0.2
		)
		.from(
			".lydia-dp",
			0.5, {
				scale: 3.5,
				opacity: 0,
				x: 25,
				y: -25,
				rotationZ: -45
			},
			"-=2"
		)
		.from(".hat", 0.5, {
			x: -100,
			y: 350,
			rotation: -180,
			opacity: 0
		})
		.staggerFrom(
			".wish-hbd span",
			0.7, {
				opacity: 0,
				y: -50,
				// scale: 0.3,
				rotation: 150,
				skewX: "30deg",
				ease: Elastic.easeOut.config(1, 0.5)
			},
			0.1
		)
		.staggerFromTo(
			".wish-hbd span",
			0.7, {
				scale: 1.4,
				rotationY: 150
			}, {
				scale: 1,
				rotationY: 0,
				color: "#ff69b4",
				ease: Expo.easeOut
			},
			0.1,
			"party"
		)
		.from(
			".wish h5",
			0.5, {
				opacity: 0,
				y: 10,
				skewX: "-15deg"
			},
			"party"
		)
		.staggerTo(
			".eight svg",
			1.5, {
				visibility: "visible",
				opacity: 0,
				scale: 80,
				repeat: 3,
				repeatDelay: 1.4
			},
			0.3
		)
		.to(".six", 0.5, {
			opacity: 0,
			y: 30,
			zIndex: "-1"
		})
		.staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
		.to(
			".last-smile",
			0.5, {
				rotation: 90
			},
			"+=1"
		)

	// tl.seek("currentStep");
	// tl.timeScale(2);

	// Restart Animation on click
	const replyBtn = document.getElementById("replay")
	replyBtn.addEventListener("click", () => {
		if (flag == false) {
			alert("对不起，生日已结束，入口已关闭");
		} else {
			tl.restart()
		}

	})
	// 
	const enterDoor = document.getElementByI("lastSmile")
	enterDoor.addEventListene("click",()=>{
		window.location.hre("pages/cake.html")
	})
}

// 页面倒计时  
function countdown(targetDate, flage) {
	// 目标日期，这里设置为2025年1月1日午夜
	const target = new Date(targetDate).getTime();

	// 更新倒计时的函数
	const updateCountdown = () => {

		// 有效期 1天
		const exp = - 1000 * 60 * 60 * 24;
		// const exp = -1000 * 60 * 2;

		// 获取当前时间
		const now = new Date().getTime();

		// 计算时间差
		const distance = target - now;

		// 计算天数、小时、分钟和秒
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		if (distance > 0) {
			flag = false;
			// 显示结果
			countdownElement.innerHTML = "生日未开始，倒计时：" + `
						      <span>${days} 天</span>
						      <span>${hours} 时</span>
						      <span>${minutes} 分</span>
						      <span>${seconds} 秒</span>
						  `;
		} else if (distance <= 0 && distance > exp) {
			countdownElement.innerHTML = "生日已开始，请尽情享受";
			flag = true;
		}

		// 如果目标日期已过，则清除定时器
		else {
			clearInterval(countdownInterval);
			flag = false;
			countdownElement.innerHTML = "很遗憾，生日已结束！";
		}
	};

	// 每秒更新一次倒计时
	const countdownInterval = setInterval(updateCountdown, 1000);

	// 立即调用一次，防止页面加载时的延迟
	updateCountdown();
}

// Run fetch and animation in sequence
fetchData()
