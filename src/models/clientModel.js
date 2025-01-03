import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      // unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    servicesTaken: {
      type: Number,
      default: 0,
    },
    referralsMade: {
      type: Number,
      default: 0,
    },
    hasServiceDiscount: {
      type: Boolean,
      default: false,
    },
    serviceDiscountDetails: {
      type: String,
      default: "",
    },
    hasReferralBenefit: {
      type: Boolean,
      default: false,
    },
    referralBenefitDetails: {
      type: String,
      default: "",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Método para incrementar los servicios tomados
clientSchema.methods.incrementServices = function () {
  this.servicesTaken += 1;

  // Otorgar un descuento por cada 7 servicios tomados
  if (this.servicesTaken > 7) {
    this.hasServiceDiscount = true;
    this.serviceDiscountDetails = "Descuento especial por 7 servicios tomados";
    this.servicesTaken = 1; // Reiniciar el conteo de servicios tomados a 1
  } else {
    this.hasServiceDiscount = false;
    this.serviceDiscountDetails = "";
  }

  return this.save();
};

// Método para incrementar los referidos realizados
clientSchema.methods.incrementReferrals = function () {
  this.referralsMade += 1;
  this.servicesTaken += 1; // Cada referido cuenta también como un servicio

  // Otorgar un beneficio por cada 5 referidos realizados
  if (this.referralsMade > 5) {
    this.hasReferralBenefit = true;
    this.referralBenefitDetails =
      "Beneficio especial por 5 referidos realizados";
    this.referralsMade = 1; // Reiniciar el conteo de referidos realizados a 1
  } else {
    this.hasReferralBenefit = false;
    this.referralBenefitDetails = "";
  }

  // También revisar si los servicios tomados alcanzan un múltiplo de 7
  if (this.servicesTaken > 7) {
    this.hasServiceDiscount = true;
    this.serviceDiscountDetails = "Descuento especial por 7 servicios tomados";
    this.servicesTaken = 1; // Reiniciar el conteo de servicios tomados a 1
  } else {
    this.hasServiceDiscount = false;
    this.serviceDiscountDetails = "";
  }

  return this.save();
};

const Client = mongoose.model("Client", clientSchema);

export default Client;
