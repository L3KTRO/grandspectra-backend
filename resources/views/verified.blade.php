<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">

    <title>Email Verified - GrandSpectra</title>
    <style>
        :root {
            color-scheme: light;
            supported-color-schemes: light;
        }

        @font-face {
            font-family: 'GTVCS';
            src: url('http://s3.lestro.top/grandspectra/fonts/CharisSILR.ttf') format('opentype');
            font-weight: 500;
            font-style: normal;
        }

        @font-face {
            font-family: 'CharisSIL';
            src: url('http://s3.lestro.top/grandspectra/fonts/CharisSILB.ttf') format('opentype');
            font-weight: 100;
            font-style: normal;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            font-family: 'GTVCS', serif;
            background-color: #111111;
            color: #fff1e0;
            line-height: 1.6;
            padding: 0.5rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #title {
            font-family: "CharisSIL", serif;
            font-size: 3rem;
            font-weight: 700;
            color: #fff1e0;
            text-align: center;
            text-shadow: 0 0 3px #880000, 0 0 5px #880000, 0 0 10px #880000, 0 0 15px #880000;
        }

        .confirmation-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #252020;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(251, 43, 43, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #191616 0%, #252020 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 2px solid #FB2B2B;
        }

        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #FB2B2B;
            text-shadow: 0 0 20px #FB2B2B;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }

        .subtitle {
            color: #a89f8e;
            font-size: 16px;
            font-weight: 400;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .success-icon {
            font-size: 64px;
            color: #28a745;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(40, 167, 69, 0.5);
        }

        .success-title {
            font-size: 28px;
            font-weight: 700;
            color: #28a745;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
        }

        .success-message {
            font-size: 18px;
            color: #d1c6b5;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .welcome-text {
            font-size: 16px;
            color: #a89f8e;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 30px 0;
        }

        .primary-button {
            display: inline-block;
            background: linear-gradient(135deg, #FB2B2B 0%, #880000 100%);
            color: #FFFFFF;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 0 20px rgba(251, 43, 43, 0.3);
            transition: all 0.3s ease;
        }

        .primary-button:hover {
            background: linear-gradient(135deg, #e02525 0%, #770000 100%);
            transform: translateY(-2px);
            box-shadow: 0 0 25px rgba(251, 43, 43, 0.4);
        }

        .secondary-button {
            display: inline-block;
            background: transparent;
            color: #FB2B2B;
            text-decoration: none;
            padding: 16px 40px;
            border: 2px solid #FB2B2B;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .secondary-button:hover {
            background-color: #FB2B2B;
            color: #FFFFFF;
            box-shadow: 0 0 20px rgba(251, 43, 43, 0.3);
        }

        .features-list {
            background-color: #191616;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #FB2B2B;
        }

        .features-title {
            font-size: 18px;
            font-weight: 600;
            color: #fff1e0;
            margin-bottom: 15px;
            text-align: center;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            color: #d1c6b5;
        }

        .feature-icon {
            color: #FFCC33;
            margin-right: 10px;
            font-weight: bold;
        }

        .footer {
            background-color: #191616;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #3e3838;
        }

        .footer-text {
            color: #736c60;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .highlight {
            color: #FFCC33;
            font-weight: 600;
        }

        @media only screen and (max-width: 600px) {
            .confirmation-container {
                margin: 10px;
                border-radius: 8px;
            }

            .header, .content, .footer {
                padding: 20px;
            }

            .logo {
                font-size: 28px;
            }

            .success-title {
                font-size: 24px;
            }

            .success-icon {
                font-size: 48px;
            }

            .action-buttons {
                flex-direction: column;
                align-items: center;
            }

            .primary-button, .secondary-button {
                width: 100%;
                max-width: 280px;
            }
        }
    </style>
</head>
<body>
<div class="confirmation-container">
    <div class="header">
        <h1 id="title">GRAND SPECTRA</h1>
        <div class="subtitle">The social network for film lovers</div>
    </div>

    <div class="content">
        <div class="success-icon">✓</div>

        <div class="success-title">Email Successfully Verified!</div>

        <div class="success-message">
            Congratulations! Your email address has been verified and your account is now fully activated.
        </div>

        <div class="welcome-text">
            Welcome to <span class="highlight">GrandSpectra</span> - the ultimate social network for film and TV show
            enthusiasts.
            You can now access all features and start connecting with fellow movie lovers.
        </div>

        <div class="features-list">
            <div class="features-title">What you can do now:</div>
            <div class="feature-item">
                <span class="feature-icon">🎬</span>
                Create and manage your personal watchlists
            </div>
            <div class="feature-item">
                <span class="feature-icon">⭐</span>
                Rate and review movies and TV shows
            </div>
            <div class="feature-item">
                <span class="feature-icon">👥</span>
                Connect with other film enthusiasts
            </div>
            <div class="feature-item">
                <span class="feature-icon">📱</span>
                Get personalized recommendations
            </div>
            <div class="feature-item">
                <span class="feature-icon">💬</span>
                Join discussions and share your thoughts
            </div>
        </div>

        <div class="action-buttons">
            <a class="primary-button" href="https://gs.lestro.top">
                Go to Grand Spectra
            </a>
        </div>
    </div>

    <div class="footer">
        <div class="footer-text">
            Thank you for joining our community of film lovers!
        </div>
        <div class="footer-text">
            © Grand Spectra. All rights reserved.
        </div>
        <div class="footer-text" style="margin-top: 10px; font-size: 12px;">
            Organize your content • Share with your friends • Updated daily
        </div>
    </div>
</div>
</body>
</html>
