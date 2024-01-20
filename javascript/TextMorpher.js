class TextMorpher {
    constructor(textElements, texts, morphTime = 2, cooldownTime = 3) {
        this.textElements = textElements;
        this.texts = texts;
        this.morphTime = morphTime;
        this.cooldownTime = cooldownTime;

        this.textIndex = texts.length - 1;
        this.time = new Date();
        this.morph = 0;
        this.cooldown = cooldownTime;

        this.updateTextContent();
        this.animate();
    }

    updateTextContent() {
        this.textElements.text1.textContent = this.texts[this.textIndex % this.texts.length];
        this.textElements.text2.textContent = this.texts[(this.textIndex + 1) % this.texts.length];
    }

    doMorph() {
        this.morph -= this.cooldown;
        this.cooldown = 0;

        let fraction = this.morph / this.morphTime;

        if (fraction > 1) {
            this.cooldown = this.cooldownTime;
            fraction = 1;
        }

        this.setMorph(fraction);
    }

    setMorph(fraction) {
        const { text1, text2 } = this.textElements;

        text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        this.updateTextContent();
    }

    doCooldown() {
        this.morph = 0;

        const { text2 } = this.textElements;

        text2.style.filter = "";
        text2.style.opacity = "100%";
        this.textElements.text1.style.filter = "";
        this.textElements.text1.style.opacity = "0%";
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        let newTime = new Date();
        let shouldIncrementIndex = this.cooldown > 0;
        let dt = (newTime - this.time) / 1000;
        this.time = newTime;

        this.cooldown -= dt;

        if (this.cooldown <= 0) {
            if (shouldIncrementIndex) {
                this.textIndex++;
            }

            this.doMorph();
        } else {
            this.doCooldown();
        }
    }
}