const Constants = {
  config: function (down: boolean, gone: boolean) {
    return {
      friction: 25,
      clamp: true,
      tension: down ? 800 : gone ? 200 : 500,
    };
  },
  dragThrowVelocity: 0.3,
  handRotation: {
    from: -5,
    to: 5
  },
  handSpacing: 312,
  targetRotationStrength: 10
};

export default Constants;
