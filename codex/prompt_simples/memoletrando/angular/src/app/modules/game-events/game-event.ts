import { Serializable } from 'src/app/base/serializable';
import * as moment from 'moment';
import { Image } from '../images/image';
import { Level } from '../levels/level';
import { User } from '../account/users/user';
import { Category } from '../categories/category';
import { Theme } from '../themes/theme';
import { GameFigure } from '../game-figures/game-figure';
import { GameSetting } from '../game-settings/game-setting';

export class GameEvent extends Serializable {

    override id: number | null = null;
    type: string | null = null;
    time: string | null = null;
    peripheral: string | null = null;
    value: string | null = null;
    game_figure_id: number | null = null;
    game_setting_id: number | null = null;
    
    created_at: moment.Moment | null = null;
    updated_at: moment.Moment | null = null;
    deleted_at: moment.Moment | null = null;

    game_figure: GameFigure | null = null;
    game_setting: GameSetting | null = null;

    constructor(data: Object = {}) {
        super();
        super.serialize(data);
    }

    override get relations() {
        return {
            game_figure: GameFigure,
            game_setting: GameSetting
        }
    }

    override get dates() {
        return ['created_at', 'updated_at', 'deleted_at'];
    }

    override get http_data() {
        return {
            type: this.type,
            time: this.time,
            peripheral: this.peripheral,
            value: this.value,
            game_figure_id: this.game_figure_id,
            game_setting_id: this.game_setting_id,
        }
    }

}
