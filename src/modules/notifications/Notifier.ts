import NotificationOption from './NotificationOption';
import Sound from '../utilities/Sound';
import BooleanSetting from '../settings/BooleanSetting';
import Settings from '../settings/Settings';

export default class Notifier {
    public static notify({
        message,
        type = NotificationOption.primary,
        title = '',
        timeout = 3000,
        time = 'just now',
        sound = null,
        setting = null,
        prompt = false,
    }: {
        message: string;
        type?: NotificationOption;
        title?: string;
        timeout?: number;
        time?: string,
        sound?: Sound,
        setting?: BooleanSetting,
        prompt?: boolean,
    }): Promise<string> {
        return new Promise((resolve) => {
            $(document).ready(() => {
                // If we have sounds enabled for this, play it now
                if (sound) {
                    sound.play();
                }

                // Check if this type of notification is disabled
                if (setting && !Settings.getSetting(setting.name).value) {
                    return;
                }

                // Get the notification ready to display
                const toastID = Math.random().toString(36).substr(2, 9);
                const toastHTML = `<div id="${toastID}" class="toast bg-${NotificationOption[type]}" data-autohide="false">
                    ${title ? `<div class="toast-header">
                        <strong class="mr-auto text-primary">${title || ''}</strong>
                        <small class="text-muted">${time}</small>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>
                    </div>` : ''}
                    <div class="toast-body text-light">
                        ${message.replace(/\n/g, '<br/>')}
                        ${prompt ? `<br/><br/><input class="outline-dark form-control" placeholder="Type here.." id="promptInput${toastID}" type="text"><br/>
                        <button class="btn btn-block outline-dark btn-primary" data-dismiss="toast">Submit</button>` : ''}
                        ${title ? '' : '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">×</button>'}
                    </div>
                    </div>`;
                $('#toaster').prepend(toastHTML);

                // Show the notification
                $('.toast')?.toast('show');

                // Once the notification is shown, hide it after specified timeout
                $(`#${toastID}`).on('shown.bs.toast', () => {
                    setTimeout(() => {
                        $(`#${toastID}`).toast('hide');
                    }, timeout);
                });

                // Once hidden remove the element
                $(`#${toastID}`).on('hidden.bs.toast', () => {
                    let inputValue;
                    if (prompt) {
                        const inputEl = document.getElementById(`promptInput${toastID}`) as HTMLInputElement;
                        inputValue = inputEl?.value;
                    }
                    document.getElementById(toastID).remove();
                    resolve(inputValue);
                });
            });
        });
    }
}
