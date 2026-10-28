import { AlertData } from '../alert/alert.component';
import { CardPair } from './card';

const IMAGES_PATH = '../../../assets/image';

/** Cartas fixas usadas enquanto as figuras do jogo (game_figures) não são exibidas. */
export const DEMO_CARD_PAIRS: readonly CardPair[] = [
  { img: `${IMAGES_PATH}/orca.webp`, word: 'baleia' },
  { img: `${IMAGES_PATH}/peixe.jpeg`, word: 'peixe' },
  { img: `${IMAGES_PATH}/tubarao.jpg`, word: 'tubarao' },
  { img: `${IMAGES_PATH}/tataruga.jpeg`, word: 'tartaruga' },
];

/** Deve acompanhar a classe `col-md-3` do template. */
export const CARDS_PER_ROW = 4;

export const PAIR_FOUND_ALERT: AlertData = {
  title: 'Parabéns!!!',
  description: 'Vamos para a próxima etapa',
  image: `${IMAGES_PATH}/character/brain_positive.png`,
};

export const WORD_GUESSED_ALERT: AlertData = {
  title: 'Muito bem!!!',
  description: 'Continue assim',
  image: `${IMAGES_PATH}/character/brain_read.png`,
};

export const INCENTIVE_VOICES: readonly string[] = ['foi_por_pouco', 'ops_foi_quase', 'ops_nao_foi_dessa_vez', 'quase_la'];
