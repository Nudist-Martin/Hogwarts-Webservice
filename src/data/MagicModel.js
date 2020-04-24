import ObservableModel from "./ObservableModel";

class MagicModel extends ObservableModel {
  constructor() {
    super();
    this._currentHouse;
  }

  changeParams(newParam) {
    this.params = newParam;
  }

  toTitleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  setHouse() {
    this._currentHouse = this.toTitleCase(this.getCookie("house"));
    this.notifyObservers();
  }

  getHouse() {
    return this._currentHouse;
  }

  deleteSpecificCookie(cname) {
    document.cookie =
      cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  newCookie(cname, value) {
    document.cookie = cname + "=" + value + "; path=/";
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  fetchData(parameter, theHouse) {
    const url = new URL("https://www.potterapi.com/v1/" + parameter),
      params = {
        key: "$2a$10$m6QOfeafHLsNSQwkY0R3W.IYHFedzSzSA/rGvUKy.oU3u690yEx.u"
      };
    if (theHouse) {
      params["house"] = theHouse;
    }
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    return fetch(url, {
      key: "$2a$10$m6QOfeafHLsNSQwkY0R3W.IYHFedzSzSA/rGvUKy.oU3u690yEx.u"
    }).then(this.processResponse);
  }

  fetchDataID(id) {
    const url = new URL("https://www.potterapi.com/v1/spells/" + id),
      params = {
        key: "$2a$10$m6QOfeafHLsNSQwkY0R3W.IYHFedzSzSA/rGvUKy.oU3u690yEx.u"
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    return fetch(url, {
      key: "$2a$10$m6QOfeafHLsNSQwkY0R3W.IYHFedzSzSA/rGvUKy.oU3u690yEx.u"
    }).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new MagicModel();
export default modelInstance;
