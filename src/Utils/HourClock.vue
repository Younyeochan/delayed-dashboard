<template>
  <div>
    <a-row>
      <div align="center">
        {{ cur24Hour }}
<<<<<<< Updated upstream
        <h6>{{ cur24HourAngle }}</h6>
=======
        <!-- <h6>{{ cur24HourAngle }}</h6> -->
>>>>>>> Stashed changes
      </div>
    </a-row>

    <div
      style="
        width: 70%;
        height: 70%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <svg
        width="100%"
        height="100%"
      >
        <g>
          <line
            id="hourhand"
            x1="50%"
            y1="50%"
            x2="50%"
            y2="100%"
            style="stroke-width: 5px; stroke:grey;"
          >
            <animatetransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          <circle
            id="center"
            cx="50%"
            cy="50%"
            r="5"
            style="fill:grey; stroke:grey; stroke-width: 2px;"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: 1000,
      cur24Hour: "--시 --분",
      cur24HourAngle: "---",
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      let date = new Date();
      this.cur24HourAngle = 360 * date.getHours() / 24 + date.getMinutes() / 2;
      this.cur24Hour = date.getHours() + ':' + date.getMinutes();
    }, 1000)
  }
}
</script>

