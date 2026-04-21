let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    // Երաժշտության ավտոմատ խաղալու սկսելը (աշխատում է, քանի որ օգտատերը սեղմել է Այո, որ հասնի այստեղ)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊' // Վերևի կոճակը կդառնա "🔊"
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Նախնական մեծ պայթյուն
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Շարունակական կողային կրակոցներ
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇' // Երաժշտությունը փակելու նշանը
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊' // Երաժշտությունը բացելու նշանը
    }
}
