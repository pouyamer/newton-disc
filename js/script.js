// This is an app that displays the newton disc
// and spins it when the user clicks on it.

const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size } = config.canvas

canvas.width = size.width
canvas.height = size.height

const center = { x: size.width / 2, y: size.height / 2 }

// Slice array
const slices = Array(config.disc.slices)
  .fill()
  .map((_, i) => {
    const { PI } = Math
    const { slices, radius, color } = config.disc
    const { saturation, lightness } = color
    return new Slice(
      center.x,
      center.y,
      radius,
      i * ((2 * PI) / slices),
      (i + 1) * ((2 * PI) / slices),
      hslStringify((i * 360) / slices, saturation, lightness)
    )
  })

let rotateAngle = 0
let rotateAngleChangeAcceleration = 0

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, size.width, size.height)

  // draw the background
  ctx.fillStyle = config.canvas.background
  ctx.fillRect(0, 0, size.width, size.height)

  // draw the slices
  slices.forEach(slice => slice.draw(ctx, rotateAngle))

  // speed and acceleration for the rotation
  rotateAngle += rotateAngleChangeAcceleration
  rotateAngleChangeAcceleration += 0.0001
}

// App Starts Here
animate()

// TODO: اگر کاربر روی دیسک درگ کند ، دیسک باید برگردد
