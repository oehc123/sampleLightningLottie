// Copyright (c) Home Box Office, Inc. as an unpublished work. Neither this material nor any portion hereof may be
// copied or distributed without the express written consent of Home Box Office, Inc. This material also contains
// proprietary and confidential information of Home Box Office, Inc. and its suppliers, and may not be used by
// or disclosed to any person, in whole or in part, without the prior written consent of Home Box Office, Inc.

import lottieWeb, { AnimationItem } from 'lottie-web';

interface ILottieAnimation {
  container: HTMLElement;
  animationItem?: AnimationItem;
}

export class LottieManager {
  private static _instance?: LottieManager;

  private _animations: { [key: string]: ILottieAnimation } = {};

  public static initialize(): void {
    if (!this._instance) {
      this._instance = new LottieManager();
    }
  }

  public static getInstance(): LottieManager {
    if (!this._instance) {
      LottieManager.initialize();
    }

    return this._instance!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public createAnimation(containerId: string, animationData: any): void {
    const iLottieAnimation = this._getOrCreateContainer(containerId);

    iLottieAnimation.animationItem = this._createAnimationItem(iLottieAnimation.container, animationData);
  }

  private _getOrCreateContainer(containerId: string): ILottieAnimation {
    if (this._animations[containerId]) {
      return this._animations[containerId];
    }

    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    container.style.zIndex = '99999';
    container.style.position = 'absolute';
    container.style.right = '0';
    container.style.bottom = '0';

    return {
      container
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _createAnimationItem(container: HTMLElement, animationData: any): AnimationItem {
    return lottieWeb.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      animationData
    });
  }

}
