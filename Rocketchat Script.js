class Script {
  /**
   * @params {object} request
   */
  process_incoming_request({ request }) {
    // ANORBANK: Конвертор время (seconds to hours)
    function secondsToHms(n) {
      if (typeof n !== 'undefined') {
        n = Number(n);
        var d = Math.floor(n / 3600 / 24);
        var h = Math.floor((n / 3600) % 24);
        var m = Math.floor((n % 3600) / 60);
        var s = Math.floor((n % 3600) % 60);

        var dDisplay = d > 0 ? d + ' д, ' : '';
        var hDisplay = h > 0 ? h + ' ч, ' : '';
        var mDisplay = m > 0 ? m + ' мин, ' : '';
        var sDisplay = s >= 0 ? s + ' с' : '';
        return '\n Время на решение: *' + dDisplay + hDisplay + mDisplay + sDisplay + '*';
      } else {
        return '';
      }
    }

    // ANORBANK: Назавние приоритета в зависимости от запроса
    function priority_name(i) {
      i = String(i);
      let prepare_string = '*Приоритет: ';
      switch (i) {
        case '1':
          return prepare_string + 'Критический 🔥*';
        case '2':
          return prepare_string + 'Высокий 🔺*';
        case '3':
          return prepare_string + 'Средний*';
        case '4':
          return prepare_string + 'Низкий 🔻*';
        default:
          break;
      }
    }

    // ANORBANK: Цвет приоритета в зависимости от запроса
    function priority_color(color) {
      color = String(color);
      switch (color) {
        case '1':
          return '#ff0000';
        case '2':
          return '#F5455C';
        case '3':
          return '#f8ffab';
        case '4':
          return '#F7F8FA';
        default:
          break;
      }
    }

    console.log(request.content);
    return {
      content: {
        text: request.content.text + secondsToHms(request.content.time_spent),
        channel: request.content.channel,
        attachments: [
          {
            text: priority_name(request.content.priority),
            color: priority_color(request.content.priority),
          },
        ],
      },
    };
  }
}
