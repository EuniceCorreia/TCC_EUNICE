<?php

namespace App\Modules\Account\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RandomPasswordNotification extends Notification
{
    use Queueable;
    protected $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($temp_password)
    {
        $this->temp_password = $temp_password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $temp_password = $this->temp_password;
        $subject       = 'Solicitação de redefinição de senha';
        $fantasy_name  = env('APP_NAME');
        $noreply_email = env('MAIL_USERNAME');

        return (new MailMessage)
            ->from($noreply_email, "$fantasy_name")
            ->subject($subject)
            ->view('sg.account::mail.temp-password', compact('temp_password', 'fantasy_name'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
