import React from "react"
 import "../style/HomePage.css"
const Login=()=>{
    return(
        <>
    <h1>להרשמה</h1>
    

<section className="features-section">
<h2 className="section-title">למה לבחור בנו?</h2>

<div className="features-grid">
  <div className="feature-card">
    <div className="feature-icon">
      <i className="fas fa-money-bill-wave"></i>
    </div>
    <h3>חיסכון בעלויות</h3>
    <p>חלק את עלויות הנסיעה עם נוסעים אחרים וחסוך בהוצאות דלק וחניה</p>
  </div>
  
  <div className="feature-card">
    <div className="feature-icon">
      <i className="fas fa-leaf"></i>
    </div>
    <h3>ידידותי לסביבה</h3>
    <p>הפחת את פליטת הפחמן הדו-חמצני על ידי נסיעות משותפות</p>
  </div>
  
  <div className="feature-card">
    <div className="feature-icon">
      <i className="fas fa-shield-alt"></i>
    </div>
    <h3>בטוח ואמין</h3>
    <p>מערכת אימות ודירוגים לשמירה על בטיחות הנוסעים והנהגים</p>
  </div>
  
  <div className="feature-card">
    <div className="feature-icon">
      <i className="fas fa-users"></i>
    </div>
    <h3>קהילה חברתית</h3>
    <p>הכר אנשים חדשים והרחב את מעגל ההיכרויות שלך</p>
  </div>
</div>
</section>

        </>
    )
}
export default Login



