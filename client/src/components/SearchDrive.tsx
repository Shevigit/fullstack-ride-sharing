const SearchDrive=()=>{
    return(
        <>
     <h1>SearchDrive</h1>
     <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">הדרך הקלה לנסיעות משותפות</h1>
          <p className="hero-subtitle">מצא נסיעות או הצע נסיעות לאחרים בדרכך ליעד</p>
          
          <div className="search-container">
            <div className="search-form">
              <div className="form-group">
                <label htmlFor="origin">
                  <i className="fas fa-map-marker-alt"></i>
                </label>
                <input type="text" id="origin" placeholder="עיר מוצא" />
              </div>
              
              <div className="form-group">
                <label htmlFor="destination">
                  <i className="fas fa-map-pin"></i>
                </label>
                <input type="text" id="destination" placeholder="עיר יעד" />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">
                  <i className="fas fa-calendar"></i>
                </label>
                <input type="date" id="date" />
              </div>
              
              <div className="form-group">
                <label htmlFor="time">
                  <i className="fas fa-clock"></i>
                </label>
                <input type="time" id="time" />
              </div>
              
              <button className="btn btn-search">
                <i className="fas fa-search"></i>
                חיפוש
              </button>
            </div>
          </div>
        </div>
      </section>

        </>
    )
}
export default SearchDrive