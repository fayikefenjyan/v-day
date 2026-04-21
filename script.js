const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 նորմալ
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 շփոթված
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",             // 2 խնդրական
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",             // 3 վշտացած
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 ավելի վշտացած
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",             // 5 խլացված
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",               // 6 շատ խլացված
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 լացուկի փախչող
]

const noMessages = [
    "Ոչ",
    "Դուք հաստատ զարմանում եք? 🤔",
    "Պուկի խնդրում եմ... 🥺",
    "Եթե դու ասում ես ոչ, ես շատ վշտացած կլինեմ...",
    "Ես շատ վշտացած կլինեմ... 😢",
    "Խնդրում եմ??? 💔",
    "Մի արա սա ինձ հետ...",
    "Վերջին շանսը! 😭",
    "Դու նույնիսկ ինձ բռնել չես կարող 😜"
]

const yesTeasePokes = [
    "փորձիր ասել ոչ առաջինը... ես կասկածում եմ, թե ինչ կլինի 😏",
    "շարունակիր, սեղմիր ոչ... պարզապես մեկ անգամ 👀",
    "դու բացակայում ես 😈",
    "սեղմիր ոչ, ես համարձակվում եմ 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Ավտոմատ վերարտադրություն՝ երաժշտությունը սկսվում է լռությամբ (այդպես է պահանջում բրաուզերի քաղաքականությունը), անմիջապես բացել
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Փոխարինող տարբերակ՝ առաջին փոխազդեցությամբ բացելու
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Վարժանք՝ փորձիր բացատրել ոչ ասելը առաջինը
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Սայթաբերական հաղորդագրություններ
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Եզրագիծը աճում է այս ժամանակ
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Փոքրացում ոչ կոճակը համեմատությամբ
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Միանշանակ անհատականացված միավորների փոխանակում
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Փախուստը սկսվում է 5-րդ կտտացումից
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
