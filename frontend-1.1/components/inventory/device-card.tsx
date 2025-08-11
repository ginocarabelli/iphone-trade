"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Battery, HardDrive, Palette } from "lucide-react"
import Image from "next/image"
import {DeviceCardProps} from "@/models/models";

function getDeviceImage(modelo : string, color: string) {
  const modeloLower = modelo.toLowerCase();
  const colorLower = color.toLowerCase();
  switch (true) {
    case modeloLower.includes("15 pro max"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("titanio negro"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blacktitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        case colorLower.includes("blanco") || colorLower.includes("titanio blanco"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-whitetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        case colorLower.includes("azul") || colorLower.includes("titanio azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-bluetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
      }

    case modeloLower.includes("15 pro"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("titanio negro"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-blacktitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        case colorLower.includes("blanco") || colorLower.includes("titanio blanco"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-whitetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        case colorLower.includes("azul") || colorLower.includes("titanio azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-bluetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112";
      }

    case modeloLower.includes("14 pro max"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("espacial"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("dorado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("morado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-deeppurple-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
      }

    case modeloLower.includes("14 pro"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("espacial"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("dorado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        case colorLower.includes("morado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-deeppurple-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896";
      }

    case modeloLower.includes("13 pro max"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("grafito"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("dorado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-sierablue-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
      }

    case modeloLower.includes("13 pro"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("grafito"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("dorado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-sierablue-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000";
      }

    case modeloLower.includes("13"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("medianoche"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
        case colorLower.includes("rosa"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
        case colorLower.includes("rojo"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-red-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
        case colorLower.includes("blanco"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000";
      }

    case modeloLower.includes("12 pro max"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("grafito"):
          return "https://loop-mobile.es/cdn/shop/files/iphone12_pro_max_graphite_both_4038c8bb-af80-4f51-94e0-89bd86e85814.jpg?v=1727361372";
        case colorLower.includes("dorado"):
          return "https://ubuntec.vtexassets.com/arquivos/ids/309794-300-300?v=638650633262930000&width=300&height=300&aspect=true";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
        case colorLower.includes("azul"):
          return "https://m.media-amazon.com/images/I/71MHTD3uL4L._UF894,1000_QL80_.jpg";
        default:
          return "https://www.alemaniacell.com/image/16564/imagen-principal16564-1-1633121115.jpg";
      }

    case modeloLower.includes("12 pro"):
      switch (true) {
        case colorLower.includes("negro") || colorLower.includes("grafito"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
        case colorLower.includes("dorado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
        case colorLower.includes("plata"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-pacificblue-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000";
      }

    case modeloLower.includes("12"):
      switch (true) {
        case colorLower.includes("negro"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("blanco"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("rojo"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-red-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("verde"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-green-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("morado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1617492507000";
        default:
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
      }

    case modeloLower.includes("11 pro"):
      return "https://m.media-amazon.com/images/I/61UC1mk6dfL.jpg";

    case modeloLower.includes("11"):
      switch (true) {
        case colorLower.includes("negro"):
          return "https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp";
        case colorLower.includes("blanco"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-white-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("rojo"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-red-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("verde"):
          return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcI83V2vQ_IYbCElnlYMpZDCbCER44ORvasQ&s";
        case colorLower.includes("azul"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-blue-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000";
        case colorLower.includes("morado"):
          return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-purple-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1617492507000";
        default:
          return "https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp";
      }

    default:
      return "https://images.icon-icons.com/2429/PNG/512/apple_logo_icon_147318.png";
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "DISPONIBLE":
      return "bg-green-100 text-green-800"
    case "VENDIDO":
      return "bg-red-100 text-red-800"
    case "INTERCAMBIADO":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "EXCELENTE":
      return "text-green-600"
    case "BUENO":
      return "text-blue-600"
    case "REGULAR":
      return "text-yellow-600"
    case "MALO":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

const getBatteryColor = (battery: number) => {
  if (battery >= 90) return "text-green-600"
  if (battery >= 80) return "text-blue-600"
  if (battery >= 70) return "text-yellow-600"
  return "text-red-600"
}

export function DeviceCard({ device, onEdit, onDelete }: DeviceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{device.modelo}</h3>
            <Badge className={getStatusColor(device.estadoStock)}>{device.estadoStock}</Badge>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Imagen del dispositivo */}
        <div className="flex justify-center">
          <Image
            src={getDeviceImage(device.modelo, device.color) || "/placeholder.svg"}
            alt={`${device.modelo} ${device.color}`}
            width={120}
            height={160}
            className="object-contain"
            crossOrigin="anonymous"
          />
        </div>

        {/* Características principales */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <HardDrive className="h-4 w-4 text-gray-500" />
            <span>{device.almacenamiento}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Palette className="h-4 w-4 text-gray-500" />
            <span>{device.color}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Battery className={`h-4 w-4 ${getBatteryColor(device.condicionBateria)}`} />
            <span className={getBatteryColor(device.condicionBateria)}>{device.condicionBateria}% batería</span>
          </div>
        </div>

        {/* Estado y condición */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estado físico:</span>
            <span className={`font-medium ${getConditionColor(device.estadoFisico)}`}>{device.estadoFisico}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Condición:</span>
            <span className="font-medium">{device.condicionGeneral}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ingreso:</span>
            <span>{new Date(device.fechaIngreso).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Precio */}
        <div className="pt-2 border-t">
          <div className="text-center">
            <span className="text-2xl font-bold text-green-600">${device.precioSugerido.toLocaleString()}</span>
            <p className="text-sm text-muted-foreground">Precio sugerido</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
