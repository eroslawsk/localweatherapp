$(document).ready(function() {
  var appid = "&APPID=61ed81f7e0e0daaf85ae568ed64183e6";
  var lat, long;
  var city, state;
  var description, wind, humidity, temp;
  var toggleC = true;

  getLocalWeather();

  function getLocalWeather() {

    $.getJSON("http://ip-api.com/json", function(location) {
      lat = location.lat;
      long = location.lon;
      city = location.city;
      state = location.regionName;

      $.getJSON("https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?&lat=" + lat + "&lon=" + long + "&units=metric" + appid, function(data) {

        temp = Math.round(data.main.temp);
        humidity = data.main.humidity;
        description = data.weather[0].main;
        wind = data.wind.speed;
        $("#location").html(city + ", " + state);
        $("#currentTemp").html(temp + " &deg;C");

        $("#humidity").html(humidity + " %");
        switch (description.toLowerCase()){
          case 'clear':
            $("body").css("background-image","url('http://s33.postimg.org/oyrz7b1tr/clear_sky.jpg')");
            break;
          case 'few clouds':
          case 'clouds':
            $("body").css("background-image","url('http://i826.photobucket.com/albums/zz181/wooddragon9/Spirit%20of%20nature/storm.jpg')");
            break;
          case 'scattered clouds':
          case 'broken clouds':
            $("body").css("background-image","url('http://i160.photobucket.com/albums/t172/becky7205/Clouds/IMG_4855.jpg')");
            break;
            case 'shower':
          case 'rain':
            $("body").css("background-image","url('http://i437.photobucket.com/albums/qq99/anhtuan_0510/Rain3.jpg')");
            break;
          case 'thunderstorm':
            $("body").css("background-image","url('http://i1275.photobucket.com/albums/y447/marian_sorohan/DSC_6746-3_zps9d856088.jpg')");
            break;
          case 'snow':
            $("body").css("background-image" ,"url('http://i437.photobucket.com/albums/qq99/anhtuan_0510/Rain3.jpg')");
            break;
          default:
            $("body").css("background-image","url('http://i854.photobucket.com/albums/ab105/xemanh/8-5-beautiful%20sky/colorful-life03.jpg')");
                           }
            $("#wind").html(wind + " MPH");
      });
    });
  }

  $("#toggleBtn button").on("click", function() {
    if (toggleC === true) {
      toggleC = false;
      $("#currentTemp").html(convertToFahrenheit(temp) + " &deg;F");
    } else if (toggleC === false) {
      toggleC = true;
      $("#currentTemp").html(temp + " &deg;C");
    }
  });
});

function convertToFahrenheit(temp) {
  temp = Math.floor(temp * 9 / 5 + 32);
  return temp;
}