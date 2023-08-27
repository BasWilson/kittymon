import { game } from "@/main";
import * as PIXI from "pixi.js";

type AnimateSpriteProps = {
    sprite: PIXI.Sprite,
    to: {
        x?: number
        y?: number
    }
    duration: number,
    onFinished?: () => void;

    // shouldnt be passed as props
    animStart?: number
    pxPerTickX?: number;
    pxPerTickY?: number;
}

export class AnimationController {

    animations: AnimateSpriteProps[] = []

    setup() {
        game.ticker.add(this.tick);
    }

    destroy() {
        game.ticker.remove(this.tick);
    }

    tick = () => {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            if (!anim.animStart) anim.animStart = Date.now();
            const differenceX = (anim.to.x || anim.sprite.x) - anim.sprite.x;
            const differenceY = (anim.to.y || anim.sprite.y) - anim.sprite.y;
            const pxPerTickX = anim.pxPerTickX || (differenceX / (anim.duration / game.ticker.deltaMS))
            const pxPerTickY = anim.pxPerTickY || (differenceY / (anim.duration / game.ticker.deltaMS))
            if (!anim.pxPerTickX)
                anim.pxPerTickX = pxPerTickX

            if (!anim.pxPerTickY)
                anim.pxPerTickY = pxPerTickY;

            anim.sprite.x += anim.pxPerTickX;
            anim.sprite.y += anim.pxPerTickY;
            const elapsedMs = Date.now() - anim.animStart;
            if (elapsedMs >= anim.duration) {
                anim.sprite.x = anim.to.x || anim.sprite.x;
                anim.sprite.y = anim.to.y || anim.sprite.y;
                this.animations.splice(i, 1);
                anim.onFinished?.();
            }
        }
    }

    animate(props: AnimateSpriteProps) {
        this.animations.push(props);
    }
}
