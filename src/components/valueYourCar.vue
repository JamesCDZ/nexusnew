<template>
    <div class="card valuation-card ">
        <div class="content">
            <div class="text-container">
                <h1 class="title">Value your car</h1>
                <h2>Find out <span class="desktop-text">the value of your car</span> in just a few minutes.</h2>                
            </div>
            <div class="valuation-inputs">
                <div class="input-wrapper">
                <input id="vrm" placeholder="Enter VRM"/>
                <label for="vrm" class="input-label">VRM <span class="required-asterisk">*</span></label>
                </div>
                <div class="input-wrapper">
                <input id="mileage" placeholder="Enter mileage">
                <label for="mileage" class="input-label ">Mileage <span class="required-asterisk">*</span></label>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button><span class="desktop-text">Value my car</span><span class="mobile-text">Get valuation</span></button> 
        </div>
    </div>
</template>


<style scoped lang="scss">  
$breakpoint-desktop: 1024px;
$breakpoint-tablet: 600px;

.desktop-text {
    display: none;
}

.text-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
    font-family: "Overpass", sans-serif;
}

.title {
    font-weight: bold;
}

.value-your-car {
    background-color: rgba(246, 247, 251, 1);
    border-radius: 16px;
    padding: 10px;
    display: flex;
    font-family: "Overpass", sans-serif;
    justify-items: center;
    align-items: center;
    border: 1px solid rgba(209, 214, 224, 1);
    margin: 0px 0px 20px 5px;

    h3,
    p {
        margin: 0;
    }

    p {
        font-size: 1rem;
    }
}

button {
    font-family: "Overpass", sans-serif;
    padding: 13px 13px 13px 20px;
    background-color: rgba(117, 114, 255, 1);
    color: white;
    border-radius: 16px;
    border: 0;
    font-size: 1rem;
}

.valuation-card {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: rgba(246, 247, 251, 1);
    padding: 1rem;
    border-radius: 16px;
}

.valuation-inputs {
    display: none;
}

h1,
h2 {
    margin: 0
}

h1 {
    font-size: 1.2rem;
}

h2 {
    font-size: 0.8rem;
    font-weight: normal;
}

button {
    padding: 0.8rem;
}

.valuation-card {
    margin: 1rem 0 2rem 0;
    border: 1px solid rgba(209, 214, 224, 1);
}

@media (min-width: $breakpoint-tablet) {
    .required-asterisk {
        color: red;
    }

    .mobile-text {
        display: none;
    }

    .valuation-card {
        margin: 0;
        padding: 0;
        border-radius: 16px;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    .desktop-text {
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        display: inline;
    }

    h1,
    h2 {
        margin: 1rem
    }

    .valuation-inputs {
        display: block;
        position: relative;
    }

    .input-label {
        position: absolute;
    }

    .valuation-card {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    h1,
    h2 {
        margin: 0 0 5% 0
    }

    .content {
        padding: 0% 10% 0 10%;
        gap: 15px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .value-your-car {
        flex-direction: column;
    }

    .valuation-card {
        text-align: center;
    }

    .valuation-inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            height: 50px;
            width: 100%;
            border-radius: 16px;
            border: 0;
            padding: 1% 5%;
            box-sizing: border-box;
        }

        ::placeholder {
            font-size: 16px;
            color: rgba(162, 169, 175, 1);
        }

        .input-wrapper {
            position: relative;
        }

        label {
            position: absolute;
            left: 10px;
            top: -10px;
            padding: 3px;
            background: rgb(246, 247, 251);
            border-radius: 16px;
        }
    }

    .button-container {
        padding: 0 10%;
        width: 100%;
        box-sizing: border-box;

        button {
            width: 100%;
            font-size: 1.3rem;
            height: 3.5rem;
            cursor: pointer;
        }
    }
}

@media (min-width: $breakpoint-desktop) {

    h1,
    h2 {
        margin: 0 0 5% 0
    }
}


</style>