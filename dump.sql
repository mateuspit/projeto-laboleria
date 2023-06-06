CREATE TABLE "public.cakes" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"price" numeric NOT NULL,
	"image" varchar NOT NULL,
	"description" TEXT NOT NULL,
	"flavourId" integer NOT NULL,
	CONSTRAINT "cakes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.clients" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"phone" varchar NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.orders" (
	"id" serial NOT NULL,
	"clientId" integer NOT NULL,
	"cakeId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" numeric NOT NULL,
	"isDelivered" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.flavours" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "flavours_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "cakes" ADD CONSTRAINT "cakes_fk0" FOREIGN KEY ("flavourId") REFERENCES "flavours"("id");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id");