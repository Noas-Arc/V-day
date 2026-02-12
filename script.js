const gifStages = [
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnQzb2Zid2gzMGxqc3NhaHNhYnhhaGZ4MHo3d2t6cTZ6OHhoY242NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IQTNc14lcdB9Q9CrEj/giphy.gif",    // 0 waving
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzB1Ym1qMDA5ZjZ3emw1cHBtZWJ6aWFia3hyajVzYnRuZ2RlZjUzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RpoUQQTtBAvVHKVtJ2/giphy.gif",  // 1 curious
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3MxcmN2djJidDU0MGs0OWhlMjhpNXdseHA4M2E2N212ZGdmMTF0MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/weeMrAhcPR4dmDgW7F/giphy.gif",             // 2 surprised
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmlobXp6a3RnY2Q2anY3cmxpcHZqdHE5OHh6N2IyZTZidW94YmVncSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TrFYRvEKdPd2BzYJzY/giphy.gif",             // 3 zoomed
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXhsZmlneWZnbTNtM291eXh5Mmh2ZnRwNjl1ZmJrZGtmczhyeHB0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UGjORC6T1dpVOrrioj/giphy.gif",       // 4 angry
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjV6MmpzbTM1c2p3MXdvY2ZlemU4ZzkxcWVkM2Q2MjFwaTRpcW50diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/bN7UcS2HlxODP4fnZh/giphy.gif",             // 5 disappointed
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjV6MmpzbTM1c2p3MXdvY2ZlemU4ZzkxcWVkM2Q2MjFwaTRpcW50diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/bN7UcS2HlxODP4fnZh/giphy.gif",               // 6 yelling
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGllNWhvMnpmOXd1YWY4azNtcDM3cTFrYmd0NHI2YXg1cjR1d2NyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hWwJ6nAC6A6CcxjSom/giphy.gif"  // 7 crying
]

const noMessages = [
    "No",
    "Are you sure..? 🤔",
    "HUH?!!",
    "I'm watching you 👀 Try again",
    "You better fix it 😤",
    "Last chance!",
    "Don't do this to me..",
    "Last chance! 😭",
    "I'm gonna cry..."
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('quokka-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
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
        // Tease her to try No first
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

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap quokka GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
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
